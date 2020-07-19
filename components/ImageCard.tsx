import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import useIsInViewport from 'use-is-in-viewport';
import { AnimatePresence, motion } from 'framer-motion';

import { Keycapset, Brand, Context } from 'typings';
import StatusLabel from './StatusLabel';
import { BRAND_OPTIONS } from '../constants';
import HeartIcon from './HeartIcon';
import { useMutation } from '@apollo/react-hooks';
import { WANT_SET } from '../queries';
import context from '../context';
import { useRouter, NextRouter } from 'next/router';

interface ImageCardProps {
    keycapset: Keycapset;
}

function ImageCard(props: ImageCardProps): JSX.Element {
    const { keycapset } = props;
    const {
        name,
        coverImageUrl,
        type,
        brand,
        slug,
        groupbuyStartDate,
        groupbuyEndDate,
        isInterestCheck,
    }: Keycapset = keycapset;
    const isTemplate: boolean = !keycapset.hasOwnProperty('_id');
    const { state, dispatch } = useContext<Context>(context);
    const router: NextRouter = useRouter();

    const [addWantToUser] = useMutation<any>(WANT_SET);

    const [wasInViewport, setWasInViewport] = useState(false);
    const [isInViewport, containerRef] = useIsInViewport({ threshold: 5 });

    function getLabelByBrand(brandValue: any): string {
        const brand: Brand = BRAND_OPTIONS.find((brand: Brand) => brand.value === brandValue);
        if (brand) {
            return brand.label;
        }
    }

    function removeUserWants(id: string): string[] {
        const wantsClone = [...state.userWants];
        const indexOfSetInWants = state.userWants.indexOf(keycapset._id);
        wantsClone.splice(indexOfSetInWants, 1);
        return wantsClone;
    }

    function adduserWants(id: string): string[] {
        return [...state.userWants, keycapset._id];
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
                console.log('Is liking...', isLiking);
                const payload: any = {
                    userWants: isLiking ? adduserWants(keycapset._id) : removeUserWants(keycapset._id),
                };

                dispatch({
                    // ! this dispatch makes it go to the top because of re-render
                    type: 'set',
                    payload,
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

    useEffect(() => {
        if (isInViewport) {
            setWasInViewport(true);
        }
    }, [isInViewport]);

    return (
        <AnimatePresence>
            <Link href="/set/[set]" as={`/set/${slug}`}>
                <a ref={containerRef}>
                    {wasInViewport && (
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            className={`image-card ${isTemplate ? 'disabled' : ''}`}
                        >
                            <div className="image">
                                <img
                                    className="set"
                                    src={
                                        coverImageUrl === undefined || coverImageUrl === ''
                                            ? '/images/empty-base-kit-illu.svg'
                                            : coverImageUrl
                                    }
                                />
                            </div>
                            <div className="details">
                                <div className="top">
                                    <h4 className="set-title">{name || 'Title goes here'}</h4>
                                    <StatusLabel
                                        groupbuyStartDate={groupbuyStartDate}
                                        groupbuyEndDate={groupbuyEndDate}
                                        isIc={isInterestCheck}
                                    />
                                </div>

                                <div className="bottom">
                                    <span className="bold">
                                        <span>
                                            {getLabelByBrand(brand)} {type && type.toUpperCase()}
                                        </span>
                                        <span>{moment(groupbuyStartDate).format('YYYY')}</span>
                                    </span>

                                    <span>
                                        <span
                                            data-tip="Sign up to create collections"
                                            onClick={userWantSet}
                                            className="heart-icon"
                                        >
                                            <HeartIcon
                                                filled={state.userWants.includes(keycapset._id)}
                                                isDisabled={!state.isLoggedIn}
                                            />
                                            {!state.isLoggedIn && (
                                                <ReactTooltip delayHide={500} className="tooltip" effect="solid" />
                                            )}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </a>
            </Link>
        </AnimatePresence>
    );
}

export default ImageCard;
