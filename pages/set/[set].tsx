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
import Arrow from '../../components/Arrow';
import { getLabelByBrand } from '../../utils/labels';

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
        return <Error statusCode={404} />;
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

        console.log(keycapset._id);

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
                            mainTitle={`${keycapset.name}`}
                            subTitle={`${keycapset.designerName ? `By ${keycapset.designerName}` : null}`}
                        />

                        <div className={`set-vibe-section three`}>
                            {/* ${keycapset.imageUrls.length > 3 ? 'five' : 'three'} */}
                            <div className="img main">
                                <img src={keycapset.imageUrls[0]} alt="Render image" />
                            </div>
                            <div className="img">
                                <img src={keycapset.imageUrls[1]} alt="Render image" />
                            </div>
                            <div className="img">
                                <img src={keycapset.imageUrls[2]} alt="Render image" />
                            </div>
                            {/* {keycapset.imageUrls[3] !== undefined && (<div className="img">
                                <img src={keycapset.imageUrls[3]} alt="Render image" />
                            </div>)}
                            {keycapset.imageUrls[4] !== undefined && (<div className="img">
                                <img src={keycapset.imageUrls[4]} alt="Render image" />
                            </div>)} */}
                        </div>

                        <div className="set-info-section">
                            {!keycapset.isInterestCheck && (
                                <div className="set-info-section-label">
                                    <label className="label">Start date</label>
                                    <label className="label large">
                                        {moment(keycapset.groupbuyStartDate).format('Mo MMM YYYY')}
                                    </label>
                                </div>
                            )}
                            {!keycapset.isInterestCheck && (
                                <div className="set-info-section-label">
                                    <label className="label">End date</label>
                                    <label className="label large">
                                        {moment(keycapset.groupbuyEndDate).format('Mo MMM YYYY')}
                                    </label>
                                </div>
                            )}
                            <div className="set-info-section-label">
                                <label className="label">Designer</label>
                                <label className="label large">{keycapset.designerName || 'Unknown'}</label>
                            </div>
                            <div className="set-info-section-label">
                                <label className="label">Brand</label>
                                <label className="label large">{getLabelByBrand(keycapset.brand) || 'Unknown'}</label>
                            </div>
                            <div className="set-info-section-label">
                                <label className="label">Material</label>
                                <label className="label large">{keycapset.material.toUpperCase() || 'Unknown'}</label>
                            </div>
                            <div className="set-info-section-label">
                                <label className="label">Profile</label>
                                <label className="label large">{keycapset.type}</label>
                            </div>
                        </div>

                        <div className="set-arrow">
                            <Arrow color="#D4E4FA" direction="bottom" />
                        </div>

                        {/* <div className="set-description">
                            <p className="light center small">
                                Aliquam felis nisl, sagittis a eleifend mollis, lacinia nec dui. Nam hendrerit elit non
                                lectus consectetur ultrices. Duis rutrum, velit eget blandit elementum, purus ligula
                                suscipit eros, pulvinar auctor purus risus id est. Aenean ullamcorper arcu auctor libero
                                luctus consequat. Nulla ornare tristique nulla, a blandit magna vulputate quis. Etiam
                                convallis fringilla dolor a vehicula. Duis porta non diam at dictum.{' '}
                            </p>
                        </div> */}

                        {keycapset.kits !== null && keycapset.kits.length > 0 && (
                            <div className="set-kits">
                                <h2 className="title center">Kits</h2>
                                <div className="set-kits-grid-container">
                                    {keycapset.kits.map((kit: any, idx: number) => {
                                        return (
                                            <div key={kit.name + idx} className="kit-card">
                                                <div className="kit-card-image">
                                                    <img src={kit.imgUrl} alt={kit.name + '- image'} />
                                                </div>
                                                <h5 className="center">{kit.name}</h5>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {isGeekhackUrl && (
                            <div className="set-geekhack">
                                <ButtonLink isLarge href={keycapset.websiteUrl}>
                                    Visit on Geekhack
                                </ButtonLink>
                            </div>
                        )}

                        {keycapset.vendors.length > 0 && (
                            <div className="set-vendors">
                                <h2 className="title center">Vendors</h2>
                                <div className="set-vendors-container">
                                    {keycapset.vendors.map((vendor: Vendor, idx) => (
                                        <a href={vendor.url} target="_blank" key={idx} className="vendor-card">
                                            <img src={vendor.logoUrl} alt={`Logo ${vendor.name}`} />
                                        </a>
                                    ))}
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
