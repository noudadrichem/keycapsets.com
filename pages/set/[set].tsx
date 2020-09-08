import React, { useContext, useEffect, useState } from 'react';
import Error from '../_error';
import moment from 'moment';
import { useRouter, Router } from 'next/router';
import Slider from 'react-slick';
import { useQuery } from '@apollo/react-hooks';
import { Keycapset, Vendor, Context } from 'typings';
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

interface SetPageProps {}

function SetPage(props: SetPageProps) {
    const router = useRouter();
    const { set: slug } = router.query;

    const [keycapset, setKeycapset] = useState<Keycapset>(null);

    const variables = { slug };
    const { loading: setLoading, error: setError, data: setByQuery } = useQuery(GET_SINGLE_SET_QUERY, {
        variables,
    });
    const { state } = useContext<Context>(context);

    useEffect(() => {
        if (!setLoading && setByQuery.keycapsetBySlug) {
            console.log('setByQuery', setByQuery.keycapsetBySlug);
            setKeycapset(setByQuery.keycapsetBySlug);
        }
    }, [setByQuery]);

    function setClaimed() {
        setKeycapset({
            ...keycapset,
            designedBy: [...keycapset.designedBy, state.user._id],
        });
    }

    if (setLoading) {
        return <LoadingKeyboard />;
    }

    if (setError) {
        return (
            <>
                <Error statusCode={404} />
            </>
        );
    }

    if (keycapset !== null) {
        const isLoggedInAndIsDesigner: boolean = state.isLoggedIn && state.user.isDesigner;
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

        console.log('kits..??', keycapset.kits.length > 0);
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
                            mainTitle={`${keycapset.name} ${
                                keycapset.designerName ? `designed by ${keycapset.designerName}` : ''
                            }`}
                            subTitle={`Good luck with sharing!`}
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

                        {keycapset.kits.length > 0 && (
                            <div className="set-kits">
                                <h2>Kits</h2>
                                <p className="light">
                                    If the set entry contains kits they'll be shown up here. (soon with an account
                                    you'll be able to contribute changes if something is missing.)
                                </p>
                                <div className="set-kits-grid-container">
                                    {keycapset.kits.map((kit: any) => {
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

SetPage.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default withGA('UA-115865530-2', Router)(SetPage);
