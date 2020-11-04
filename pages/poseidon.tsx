import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import 'slick-carousel/slick/slick.css';
import '../assets/styles/main.scss';

import Meta from '../components/Meta';
import Hero from '../components/poseidon/Hero';
import Kit from '../components/poseidon/Kit';
import Renders from '../components/poseidon/Renders';
import Vendors from '../components/poseidon/Vendors';
import Updates from '../components/poseidon/Updates';
import Section from '../components/poseidon/Section';
import PoseidonLayout from '../layouts/PoseidonLayout';
import { ApolloClient } from '@apollo/client';
import CTACard from '../components/CTACard';
import { Keycapset } from '../types/interfaces';

interface PoseidonPageProps {
    keycapset: Keycapset;
    client: ApolloClient<any>;
    layout: string;
}

function PoseidonPage(props: PoseidonPageProps) {
    const { keycapset, layout } = props;
    const Layout = {
        poseidon: PoseidonLayout,
    }[layout];

    console.log(keycapset);

    return (
        <>
            <Meta title="Official IC page for GMK Poseidon" description="Noud is tering cool" metaImgUrl="" />
            <div className="set">
                <Layout>
                    <Hero />

                    <Section title="Origins">
                        <p className="section-description">
                            This set originates from my love mythology in partially Ancient greek and the ocean, I
                            started working on this set back in August of 2018, It’s original concept was to run in the
                            back then the new KAT profile from Keyreative with reserved dyesub, sadly back then reverse
                            dyesub was still something they were working on and decided to hold off and wait for further
                            details. After awhile I started rethinking the concept for a different profile and together
                            with the help of u/Janglad which who I have worked in the past on project like Minimal and
                            Equinox BT, we came with the decision to run Poseidon on the beloved Cherry profile from
                            GMK. as the barebones were already set there was still a lot to do with researching the
                            possibilities within the GMK profile. Here we chose to go with the more traditional
                            Icon+Text modifier legends as they were also used on the vintage Greek cherry keyboards. For
                            the colors we decided to go with GMK stock colors TU1 which is a deep calm and navy blue and
                            TU2 which is a bright cyan that helps with the contrast for more readable legends.
                        </p>
                    </Section>

                    <Section title="Kits">
                        {keycapset.kits.map((kit) => (
                            <Kit {...kit} />
                        ))}
                    </Section>

                    <Section title="Renders">
                        <Renders renders={keycapset.imageUrls} />
                    </Section>

                    <Section title="Updates">
                        <Updates />
                    </Section>

                    <Section title="Vendors">
                        <Vendors />
                    </Section>
                </Layout>

                <CTACard
                    title="Promote your own keycapset!"
                    text="Are you a set designer and want to run an Interest check and have a promotional website like this as well? Keycapsets is developing a toolkit for keycapset designers."
                    btnText="See more"
                    key="RUNIC"
                />
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            isLargeContainer: true,
            isNavShown: false,
            isFooterShown: false,
            layout: 'poseidon',
            keycapset: {
                name: 'Poseidon',
                type: 'cherry',
                coverImageUrl: 'cover IMG hier',
                vendors: [],
                imageUrls: [
                    // 'https://i.imgur.com/OLhtOUv.jpg',
                    'https://i.imgur.com/dCaIcDa.jpg',
                    'https://i.imgur.com/ipirs43.jpg',
                    'https://i.imgur.com/Cot5qNY.jpg',
                    'https://i.imgur.com/ToZLJ4l.jpg',
                    'https://i.imgur.com/p40MZ9v.jpg',
                    'https://i.imgur.com/PDXTXJ5.jpg',
                    'https://i.imgur.com/45XL6Sh.jpg',
                    'https://i.imgur.com/CIikahD.jpg',
                    'https://i.imgur.com/xmJVe8L.jpg',
                    'https://i.imgur.com/Ois87Lt.jpg',
                    'https://i.imgur.com/KWydW65.jpg',
                    'https://i.imgur.com/YsRZl7H.jpg',
                ],
                websiteUrl: 'https://keycapsets.com/poseidon',
                groupbuyStartDate: '-',
                groupbuyEndDate: '-',
                brand: 'gmk',
                material: 'abs',
                accentColor1: '#ff0000',
                accentColor2: '00ff00',
                accentColor3: '0000ff',
                kits: [
                    {
                        name: 'Olyumpus',
                        description:
                            'The Olympus kit features compatibility for the most popular layouts in the community and includes both esc and enter accent keys.',
                        type: '',
                        price: '',
                        imgUrl: 'https://i.imgur.com/w8nejQq.jpg',
                    },
                    {
                        name: 'Titans',
                        description:
                            'The Titans kit features both ISO and numpad support, this includes the accent enter for the numpad and 1800 support.',
                        type: '',
                        price: '',
                        imgUrl: 'https://i.imgur.com/AFG2yvw.jpg',
                    },
                    {
                        name: 'Tholos',
                        description:
                            'The Tholos kit features support for a variety of keyboards of keyboard such as the planck Alice-layout.',
                        type: '',
                        price: '',
                        imgUrl: 'https://i.imgur.com/HxTSAZz.jpg',
                    },
                    {
                        name: 'Sculpture',
                        description:
                            'The Sculpture kit offers as amazing add-on that fits the theme, it offers mono greek legends for an ascetic',
                        type: '',
                        price: '',
                        imgUrl: 'https://i.imgur.com/vh4ZHXz.jpg',
                    },
                ],
                designerName: 'Quaddepo',
                isInterestCheck: true,
            },
        },
    };
}

// PoseidonPage.getInitialProps = () => {
//     return {

//     };
// };

export default withGA('UA-115865530-2', Router)(PoseidonPage);
