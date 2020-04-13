import React from 'react';
import moment from 'moment';
import { useRouter, Router } from 'next/router';
import Slider from "react-slick";
import { useQuery } from '@apollo/react-hooks';
import { Keycapset, Vendor } from 'typings';
import withGA from 'next-ga';

import withData from '../../hooks/withData'
import { GET_SINGLE_SET_QUERY } from '../../queries';

import 'slick-carousel/slick/slick.css';
import '../../assets/styles/main.scss';

import Footer from '../../components/Footer';
import Heading from '../../components/Heading';
import Nav from '../../components/Nav';
import LoadingKeyboard from '../../components/LoadingKeyboard';
import ButtonLink from '../../components/ButtonLink';
import Meta from '../../components/Meta';

interface SetProps { }

function SetPage(props: SetProps) {
    const router = useRouter();
    const { set: slug, type } = router.query;

    const variables = { slug, type }
    const { loading, error, data } = useQuery(GET_SINGLE_SET_QUERY, { variables });

    if (loading) {
        return <LoadingKeyboard />;
    }

    if (error) {
        return <p>'Error loading keycapsets.com... Please refresh this page'</p>;
    }

    const set: Keycapset = data.keycapsetBySlug;
    const urlIsGeekHack: boolean = set.websiteUrl.includes('geekhack');
    const sliderImages = [
        set.coverImageUrl,
        ...set.imageUrls
    ]

    const slickSettings = {
        infinite: set.coverImageUrl.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: set.coverImageUrl.length > 1,
        autoPlaySpeed: 1600,
    };

    return set !== undefined && (
        <div className="set">
            <Meta
                title={`${set.type.toUpperCase()} Keycapset ${set.name}`}
                metaImgUrl={set.coverImageUrl}
            />

            <Nav />

            <div className="container">
                <Heading
                    left
                    mainTitle={`${set.name} ${set.designerName ? `designed by ${set.designerName}`: ''}`}
                    subTitle={`Good luck with sharing!`}
                />

                <div className="info-section">
                    <div>
                        {
                            sliderImages.length > 0 && (
                                <Slider {...slickSettings}>
                                    {
                                        sliderImages.map((url: string) => <img src={url} key={url} />)
                                    }
                                </Slider>
                            )
                        }
                    </div>

                    <div>
                        <h3>Info</h3>
                        <p>Designer: {set.designerName || 'Unknown'}</p>
                        <p>Profile: {set.type}</p>
                        <p>Brand: {set.brand || 'Unknown'}</p>
                        <p>Material: {set.material || 'Unknown'}</p>
                        <p>Start date: {moment(set.groupbuyStartDate).format('dddd YYYY-MM-DD')}</p>
                        <p>End date: {moment(set.groupbuyEndDate).format('dddd YYYY-MM-DD')}</p>

                        {set.vendors.length > 0 && (
                            <>
                                <br />
                                <p>Selling vendors: </p>
                                <ul>
                                    {set.vendors.map((v: Vendor, idx) => (
                                        <p key={idx}>- <a href={v.url}>{v.name}</a></p>
                                    ))}
                                </ul>
                            </>
                        )}
                        {
                            urlIsGeekHack
                                ? <ButtonLink isLarge href={set.websiteUrl}>Go to Geekhack thread</ButtonLink>
                                : <ButtonLink isLarge href={set.websiteUrl}>Visit the website</ButtonLink>
                        }
                    </div>

                </div>

            </div>

            <Footer />
        </div>
    )
}

export default withGA('UA-115865530-2', Router)(withData(SetPage));
