import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';
import { useMutation } from '@apollo/client';

import { Keycapset, Want } from '../types/types';

import { WANT_SET } from '../queries';
import HeartIcon from './HeartIcon';
import useStore from '../context';

export interface LikeSetProps {
    keycapset: Keycapset;
    size?: number;
}

function LikeSet(props: LikeSetProps) {
    const { keycapset, size = 16 } = props;
    const router: NextRouter = useRouter();
    const [addWantToUser] = useMutation(WANT_SET);

    const isLoggedIn = useStore((state) => state.isLoggedIn);
    const userWants = useStore((state) => state.userWants);
    const setUserWants = useStore((state) => state.setUserWants);

    const want = userWants.find((w: any) => w.set === keycapset._id);
    const isLiked = want?.liked || false;

    // console.log(want)

    async function userWantSet(evt: React.MouseEvent<HTMLSpanElement>) {
        evt.preventDefault();
        evt.stopPropagation();

        console.log(want);

        if (isLoggedIn) {
            try {
                const { data: response } = await addWantToUser({
                    variables: {
                        setId: keycapset._id,
                    },
                });

                const newWant: Want = response.wantSet.want;
                const newWants = [...userWants].reduce((accu: Want[], w: Want) => {
                    if (want !== undefined) {
                        if (w._id === want._id) {
                            w.liked = newWant.liked;
                        }
                    }
                    accu.push(w);
                    return accu;
                }, []);

                if (want === undefined) {
                    console.log('push new want...');
                    newWants.push({
                        ...newWant,
                        set: newWant.set._id,
                    });
                }

                console.log('newWants...', newWants);
                setUserWants(newWants);
            } catch (err) {
                console.error('want set err', err);
            }
        } else {
            router.push('/sign-up');
        }
    }

    return (
        <span data-tip="Sign up to create collections" onClick={userWantSet} className="heart-icon">
            <HeartIcon filled={isLiked} isDisabled={!isLoggedIn} width={size} height={size - 2} />
            {!isLoggedIn && <ReactTooltip delayHide={500} className="tooltip" effect="solid" />}
        </span>
    );
}

export default LikeSet;
