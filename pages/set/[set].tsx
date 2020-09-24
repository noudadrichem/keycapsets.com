import React, { useContext, useEffect, useState } from 'react';
import Error from '../_error';
import moment from 'moment';
import { useRouter, Router } from 'next/router';
import Slider from 'react-slick';
import { useQuery } from '@apollo/react-hooks';
import { Keycapset, Vendor, Context } from '../../types/interfaces';
import withGA from 'next-ga';

import { GET_SINGLE_SET_QUERY, CLAIM_SET } from '../../queries';

import 'slick-carousel/slick/slick.css';
import '../../assets/styles/main.scss';

import Heading from '../../components/Heading';
import LoadingKeyboard from '../../components/LoadingKeyboard';
import ButtonLink from '../../components/ButtonLink';
import Meta from '../../components/Meta';
import context from '../../context';
import LikeSet from '../../components/LikeSet';
import StatusLabel from '../../components/StatusLabel';
import { initializeApollo } from '../../hooks/withData';
import useStore from '../../context';

interface SetPageProps {
    keycapset: Keycapset;
    isLargeContainer: boolean;
}

function SetPage(props: SetPageProps) {
    const router = useRouter();
    const { set: slug } = router.query;
    const { keycapset } = props;
    const isLoggedIn = useStore((state) => state.isLoggedIn);
    const user = useStore((state) => state.user);

    if (keycapset === undefined) {
        return (
            <>
                <Error statusCode={404} />
            </>
        );
    }

    if (keycapset !== null) {
        const isLoggedInAndIsDesigner: boolean = isLoggedIn && user.isDesigner;
        const isGeekhackUrl: boolean = keycapset?.websiteUrl.includes('geekhack');
        const sliderImages: string[] = [keycapset.coverImageUrl, ...keycapset.imageUrls];
        const slickSettings = {
            infinite: keycapset.coverImageUrl.length > 1,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: keycapset.coverImageUrl.length > 1,
            autoPlaySpeed: 1600,
        };

        return (
            <>
                <div className="set">
                    <Meta
                        title={`${keycapset.name} ${
                            keycapset.designerName ? `designed by ${keycapset.designerName}` : ''
                        }`}
                        metaImgUrl={keycapset.metaUrl}
                    />

                    <div className="container">
                        <Heading
                            left
                            mainTitle={`${keycapset.name}`}
                            subTitle={`${
                                keycapset.designerName ? `A keycapset designed by ${keycapset.designerName}` : ''
                            }`}
                        />

                        <div className="info-section">
                            <div className="set-slick-container">
                                {sliderImages.length > 0 && (
                                    <Slider {...slickSettings}>
                                        {sliderImages.map((url: string) => (
                                            <img src={url} key={url} />
                                        ))}
                                    </Slider>
                                )}
                            </div>

                            <div>
                                {/* {isLoggedInAndIsDesigner && <ClaimSet keycapset={keycapset} callback={setClaimed} />} */}
                                <LikeSet keycapset={keycapset} />
                                <br />
                                <StatusLabel
                                    groupbuyStartDate={keycapset.groupbuyStartDate}
                                    groupbuyEndDate={keycapset.groupbuyEndDate}
                                    isIc={keycapset.isInterestCheck}
                                />
                                <h3>Info</h3>
                                <p>Designer: {keycapset.designerName || 'Unknown'}</p>
                                <p>Profile: {keycapset.type}</p>
                                <p>Brand: {keycapset.brand || 'Unknown'}</p>
                                <p>Material: {keycapset.material || 'Unknown'}</p>
                                {!keycapset.isInterestCheck && (
                                    <>
                                        <p>
                                            Start date: {moment(keycapset.groupbuyStartDate).format('dddd YYYY-MM-DD')}
                                        </p>
                                        <p>End date: {moment(keycapset.groupbuyEndDate).format('dddd YYYY-MM-DD')}</p>
                                    </>
                                )}

                                {keycapset.vendors.length > 0 && (
                                    <>
                                        <br />
                                        <p>Selling vendors: </p>
                                        <ul>
                                            {keycapset.vendors.map((v: Vendor, idx) => (
                                                <p key={idx}>
                                                    -{' '}
                                                    <a href={v.url}>
                                                        {v.country} — {v.name}
                                                    </a>
                                                </p>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {isGeekhackUrl ? (
                                    <ButtonLink isLarge href={keycapset.websiteUrl}>
                                        Go to Geekhack thread
                                    </ButtonLink>
                                ) : (
                                    <ButtonLink isLarge href={keycapset.websiteUrl}>
                                        Visit the website
                                    </ButtonLink>
                                )}
                            </div>
                        </div>

                        {keycapset.kits !== null && keycapset.kits.length > 0 && (
                            <div className="set-kits">
                                <h2>Kits</h2>
                                <div className="set-kits-grid-container">
                                    {keycapset.kits.map((kit) => {
                                        return (
                                            <div>
                                                <h3>{kit.name}</h3>
                                                <img src={kit.imgUrl} alt={kit.name + '- image'} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* <CTACard /> */}
            </>
        );
    }

    return null;
}

export async function getServerSideProps(context) {
    try {
        const client = initializeApollo();
        const { data, error } = await client.query({
            query: GET_SINGLE_SET_QUERY,
            variables: {
                slug: context.query.set,
            },
        });

        return {
            props: {
                isLargeContainer: false,
                keycapset: data.keycapsetBySlug,
            },
        };
    } catch (err) {
        console.log('SSR props err', err);
    }

    return {
        props: { isLargeContainer: false },
    };
}

export default withGA('UA-115865530-2', Router)(SetPage);
