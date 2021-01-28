import React from 'react';
import Error from '../_error';
import moment from 'moment';
import { useRouter, Router } from 'next/router';
import Slider from 'react-slick';
import { Keycapset, Vendor, Kit } from '../../types/types';
import withGA from 'next-ga';

import { GET_SINGLE_SET_QUERY } from '../../queries';

import 'slick-carousel/slick/slick.css';
import '../../assets/styles/main.scss';

import Heading from '../../components/Heading';
import ButtonLink from '../../components/ButtonLink';
import Meta from '../../components/Meta';
import LikeSet from '../../components/LikeSet';
import StatusLabel from '../../components/StatusLabel';
import { initializeApollo } from '../../hooks/withData';
import Arrow from '../../components/Arrow';
import InfoSectionBoard from '../../components/set/InfoSectionBoard';
import InfoSectionSet from '../../components/set/InfoSectionSet';
import Kits from '../../components/set/Kits';
import Button from '../../components/Button';
import { getDirectiveValues } from 'graphql';

interface SetPageProps {
    keycapset: Keycapset;
    isLargeContainer: boolean;
}

function SetPage(props: SetPageProps) {
    const { keycapset } = props;
    const router = useRouter();

    if (keycapset === undefined) {
        return <Error statusCode={404} />;
    }

    if (keycapset !== null) {
        const isGeekhackUrl = keycapset?.websiteUrl.includes('geekhack');
        const hasRenders = keycapset.imageUrls && keycapset.imageUrls.length > 0;
        const slickSettings = {
            infinite: hasRenders,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            autoplay: hasRenders,
            autoPlaySpeed: 2400,
            pauseOnHover: false,
        };

        console.log(keycapset._id);

        return (
            <>
                <div className="set">
                    <Meta
                        title={`${keycapset.name} ${keycapset.designerName ? `designed by ${keycapset.designerName}` : ''}`}
                        metaImgUrl={keycapset.metaUrl}
                    />

                    <div className="container">
                        <Heading mainTitle={keycapset.name} subTitle={`${keycapset.designerName ? `By ${keycapset.designerName}` : ''}`} />
                        <section className="set-status">
                            <div className="labels">
                                <StatusLabel
                                    groupbuyStartDate={keycapset.groupbuyStartDate}
                                    groupbuyEndDate={keycapset.groupbuyEndDate}
                                    isIc={keycapset.isInterestCheck}
                                />

                                <LikeSet keycapset={keycapset} size={24} />
                            </div>
                            {keycapset.interestCheck !== null && keycapset.interestCheck.status === 'online' && (
                                <Button
                                    onClick={() => router.push(`/ic/${keycapset.slug}`)}
                                    size="lg"
                                    variant="primary"
                                    style={{
                                        backgroundColor: keycapset.accentColor1,
                                        border: 'none',
                                    }}
                                >
                                    Fill in Interest Check
                                </Button>
                            )}
                        </section>

                        {hasRenders ? (
                            <section className={`section set-vibe-section three`}>
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
                            </section>
                        ) : (
                            <section className={`section set-vibe-section cover`}>
                                <div className="img main base">
                                    <img src={keycapset.coverImageUrl} alt="Base set image" />
                                </div>
                            </section>
                        )}

                        {keycapset.type !== 'keyboard' ? <InfoSectionSet {...{ keycapset }} /> : <InfoSectionBoard {...{ keycapset }} />}

                        <section className="section set-arrow">
                            <Arrow color="#D4E4FA" direction="bottom" />
                        </section>

                        {keycapset.description && (
                            <section className="section set-description">
                                <p className="light center small">{keycapset.description}</p>
                            </section>
                        )}

                        {keycapset.kits !== null && keycapset.kits.length > 0 && (
                            <Kits {...{ kits: keycapset.kits }} type={keycapset.type} />
                        )}

                        {keycapset.vendors.length > 0 && (
                            <section className="section set-vendors">
                                <h2 className="title center">Vendors</h2>
                                <div className="set-vendors-container">
                                    {keycapset.vendors.map((vendor: Vendor, idx) => (
                                        <a href={vendor.url} target="_blank" key={idx} className="vendor-card">
                                            <img src={vendor.logoUrl} alt={`Logo ${vendor.name}`} />
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}

                        {isGeekhackUrl && (
                            <section className="section set-geekhack">
                                <ButtonLink isLarge href={keycapset.websiteUrl + '?utm_source=keycapsets&utm_medium=affiliate'}>
                                    Visit on Geekhack
                                </ButtonLink>
                            </section>
                        )}

                        {hasRenders && (
                            <section className="section set-renders">
                                <h2 className="title center">Renders</h2>

                                <div className="slick-container">
                                    <Slider {...slickSettings}>
                                        {keycapset.imageUrls.map((url: string, idx: number) => (
                                            <img src={url} key={idx + url} />
                                        ))}
                                    </Slider>
                                </div>
                            </section>
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
        const { data } = await client.query({
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
