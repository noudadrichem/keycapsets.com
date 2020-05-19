import React from 'react';
import { Router } from 'next/router';
import { Keycapset } from 'typings';
import withGA from 'next-ga';

import withData from '../hooks/withData';

import 'slick-carousel/slick/slick.css';
import '../assets/styles/main.scss';

import Meta from '../components/Meta';
import { ApolloClient } from 'apollo-boost';
import PoseidonLayout from '../layouts/PoseidonLayout';

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

    return (
        <>
            <Meta title="Official IC page for GMK Poseidon" description="Noud is tering cool" metaImgUrl="" />
            <div className="set">
                <Layout>
                    <div>
                        <pre>{JSON.stringify(keycapset, undefined, 4)}</pre>
                    </div>
                </Layout>
            </div>
        </>
    );
}

PoseidonPage.getInitialProps = () => {
    return {
        layout: 'poseidon',
        keycapset: {
            name: 'Poseidon',
            type: 'cherry',
            coverImageUrl: 'cover IMG hier',
            vendors: [],
            imageUrls: [''],
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
                    name: 'Base',
                    description: '',
                    type: '',
                    price: '',
                    imgUrl: '',
                },
                {
                    name: 'Novelties',
                    description: '',
                    type: '',
                    price: '',
                    imgUrl: '',
                },
                {
                    name: 'Spacebars',
                    description: '',
                    type: '',
                    price: '',
                    imgUrl: '',
                },
                {
                    name: 'Spacebars',
                    description: '',
                    type: '',
                    price: '',
                    imgUrl: '',
                },
            ],
            designerName: 'Quaddepo',
            isInterestCheck: true,
        },
    };
};

export default withGA('UA-115865530-2', Router)(withData(PoseidonPage));
