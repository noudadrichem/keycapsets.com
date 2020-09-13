import React, { useContext } from 'react';
import { NextRouter, useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';
import { useMutation } from '@apollo/react-hooks';
import { Keycapset, Context } from 'typings';

// import context from '../context';
import { WANT_SET } from '../queries';
import HeartIcon from './HeartIcon';
import useStore from '../context';

export interface LikeSetProps {
    keycapset: Keycapset;
}

function LikeSet(props: LikeSetProps) {
    const { keycapset } = props;
    const router: NextRouter = useRouter();
    const [addWantToUser] = useMutation<any>(WANT_SET);

    const isLoggedIn = useStore<any>((state) => state.isLoggedIn);
    const userWants = useStore<any>((state) => state.userWants);
    const setUserWants = useStore<any>((state) => state.setUserWants);

    function removeUserWants(id: string): Keycapset[] {
        const wantsClone = [...userWants];
        const indexOfSetInWants = userWants.map((s: Keycapset) => s._id).indexOf(id);
        wantsClone.splice(indexOfSetInWants, 1);
        console.log('remove set ', wantsClone);
        return wantsClone;
    }

    function adduserWants(keycapset: Keycapset): Keycapset[] {
        const x = [...userWants, keycapset];
        console.log('add set ', [...userWants, keycapset]);
        return x;
    }

    async function userWantSet(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();

        if (isLoggedIn) {
            try {
                const { data: response } = await addWantToUser({
                    variables: {
                        setId: keycapset._id,
                    },
                });
                const isLiking: boolean = response.wantSet.message === 'liked';
                setUserWants(isLiking ? adduserWants(keycapset) : removeUserWants(keycapset._id));
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
                filled={userWants.map((s: Keycapset) => s._id).includes(keycapset._id)}
                isDisabled={!isLoggedIn}
            />
            {!isLoggedIn && <ReactTooltip delayHide={500} className="tooltip" effect="solid" />}
        </span>
    );
}

export default LikeSet;
