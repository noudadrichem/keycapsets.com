import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';

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

    function getLabelByBrand(brandValue: string): string {
        const brand: Brand = BRAND_OPTIONS.find((brand: Brand) => brand.value === brandValue);
        if (brand) {
            return brand.label;
        }
    }

    async function userWantSet(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();

        if (state.isLoggedIn) {
            try {
                const response = await addWantToUser({
                    variables: {
                        setId: keycapset._id,
                    },
                });
                dispatch({
                    // ! this dispatch makes it go to the top because of re-render
                    type: 'set',
                    payload: {
                        userWants: [...state.userWants, keycapset._id],
                    },
                });
            } catch (err) {
                console.error('want set err', { err });
            }
        } else {
            router.push('/sign-up');
        }
    }

    return (
        <LazyLoad offset={400} height={400}>
            <Link href="/set/[set]" as={`/set/${slug}`} prefetch>
                <div className={`image-card ${isTemplate ? 'disabled' : ''}`}>
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
                </div>
            </Link>
        </LazyLoad>
    );
}

export default ImageCard;
