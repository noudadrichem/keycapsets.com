import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

import 'slick-carousel/slick/slick.css';
import '../../assets/styles/main.scss';

import Meta from '../../components/Meta';
import Hero from '../../components/poseidon/Hero';
import Kit from '../../components/poseidon/Kit';
import Renders from '../../components/poseidon/Renders';
import Vendors from '../../components/poseidon/Vendors';
import Updates from '../../components/poseidon/Updates';
import Section from '../../components/poseidon/Section';
import PoseidonLayout from '../../layouts/PoseidonLayout';
import { ApolloClient } from '@apollo/client';
import CTACard from '../../components/CTACard';
import { Keycapset } from '../../types/interfaces';
import { initializeApollo } from '../../hooks/withData';
import { GET_SINGLE_SET_QUERY } from '../../queries';

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

    function redirectToLanding() {
        Router.push('/promote-your-keycapset');
    }

    return (
        <>
            <Meta title="Official IC page for GMK Poseidon" />
            <div className="set">
                <Layout>
                    <Hero />

                    <Section title="Origins">
                        <p className="section-description">{keycapset.description}</p>
                    </Section>

                    <Section title="Kits">
                        {keycapset.kits.map((kit) => (
                            <Kit key={kit.name} {...kit} />
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
                    text="Are you a set designer and want to run an Interest check and get a promotional website like this as well? Keycapsets is developing a toolkit for keycapset designers."
                    btnText="Read more"
                    key="RUN_IC"
                    action={redirectToLanding}
                />
            </div>
        </>
    );
}

export async function getServerSideProps(context: any) {
    // 5efb4679c845cc3819a29881
    try {
        const client = initializeApollo();
        const { data } = await client.query({
            query: GET_SINGLE_SET_QUERY,
            variables: {
                slug: 'gmk-poseidon-cherry',
            },
        });

        return {
            props: {
                isLargeContainer: true,
                isNavShown: false,
                isFooterShown: false,
                layout: 'poseidon',
                keycapset: data.keycapsetBySlug,
            },
        };
    } catch (err) {
        console.log('SSR props err', err);
    }
}

export default withGA('UA-115865530-2', Router)(PoseidonPage);
