import React from 'react';
import { useRouter, Router } from 'next/router';
import Head from 'next/head';
import Slider from "react-slick";
import { useQuery } from '@apollo/react-hooks';
import { Keycapset } from 'typings';
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

interface SetProps {}

function SetPage(props: SetProps) {
    const router = useRouter();
    const { set: slug, type } = router.query;
    const variables = { slug, type }
    const { loading, error, data } = useQuery(GET_SINGLE_SET_QUERY, { variables });

    console.log({ loading, error, data })
    const slickSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (loading) {
        return <LoadingKeyboard />;
    }

    if (error) {
        return <p>'Error loading keycapsets.com... Please refresh this page'</p>;
    }

    const set: Keycapset = data.keycapsetBySlug;

    const urlIsGeekHack: boolean = set.websiteUrl.includes('geekhack');

    return set !== undefined && (
        <div className="set">
            <Head>
                <title>{set.type.toUpperCase()} Keycapset {set.name}</title>
            </Head>

            <Nav />

            <div className="container">
                <Heading
                    mainTitle="Come back later or send an email to contact@keycapsets.com"
                    subTitle={`We are currently working hard on a page for ${set.name}`}
                />

                {
                    urlIsGeekHack
                    ? <ButtonLink isLarge href={set.websiteUrl}>Go to Geekhack thread</ButtonLink>
                    : <ButtonLink isLarge href={set.websiteUrl}>Visit the website</ButtonLink>
                }

                {
                    set.imageUrls.length > 0 && (
                        <Slider {...slickSettings}>
                            {
                                set.imageUrls.map((url: string) => <img src={url} key={url} />)
                            }
                        </Slider>
                    )
                }

            </div>

            <Footer />
        </div>
    )
}

export default withGA('UA-115865530-2', Router)(withData(SetPage));
