import React, { useContext } from 'react';
import { NextRouter, useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';
import { useMutation } from '@apollo/react-hooks';
import { Keycapset, Context } from 'typings';

import context from '../context';
import { WANT_SET } from '../queries';
import HeartIcon from './HeartIcon';

export interface LikeSetProps {
    keycapset: Keycapset;
}

function LikeSet(props: LikeSetProps) {
    const { keycapset } = props;
    const { state, dispatch } = useContext<Context>(context);
    const router: NextRouter = useRouter();

    const [addWantToUser] = useMutation<any>(WANT_SET);

    function removeUserWants(id: string): Keycapset[] {
        const wantsClone = [...state.userWants];
        const indexOfSetInWants = state.userWants.map((s: Keycapset) => s._id).indexOf(id);
        wantsClone.splice(indexOfSetInWants, 1);
        console.log('remove set ', wantsClone);
        return wantsClone;
    }

    function adduserWants(keycapset: Keycapset): Keycapset[] {
        const x = [...state.userWants, keycapset];
        console.log('add set ', [...state.userWants, keycapset]);
        return x;
    }

    async function userWantSet(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();

        if (state.isLoggedIn) {
            try {
                const { data: response } = await addWantToUser({
                    variables: {
                        setId: keycapset._id,
                    },
                });
                const isLiking: boolean = response.wantSet.message === 'liked';
                const currentScrollPosition: number = window.scrollY;
                dispatch({
                    // ! this dispatch makes it go to the top because of re-render
                    type: 'set',
                    payload: {
                        userWants: isLiking ? adduserWants(keycapset) : removeUserWants(keycapset._id),
                    },
                });
                setTimeout(() => {
                    window.scrollTo(0, currentScrollPosition);
                });
            } catch (err) {
                console.error('want set err', { err });
            }
        } else {
            router.push('/sign-up');
        }
    }

    return (
        <span data-tip="Sign up to create collections" onClick={userWantSet} className="heart-icon">
            <HeartIcon
                filled={state.userWants.map((s: Keycapset) => s._id).includes(keycapset._id)}
                isDisabled={!state.isLoggedIn}
            />
            {!state.isLoggedIn && <ReactTooltip delayHide={500} className="tooltip" effect="solid" />}
        </span>
    );
}

export default LikeSet;
