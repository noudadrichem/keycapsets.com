import React from 'react';
import Error from 'next/error';
import { useQuery } from '@apollo/client';
import withGA from 'next-ga';
import Router from 'next/router';

import { GET_VENDORS_QUERY } from '../queries';
import { Vendor } from '../types/interfaces';

import Heading from '../components/Heading';
import LoadingKeyboard from '../components/LoadingKeyboard';
import VendorCard from '../components/VendorCard';

import '../assets/styles/main.scss';

import countryIsoList from '../assets/countries';
import Meta from '../components/Meta';

interface VendorProps {
    vendors: {
        country: string;
    }[];
}

function Vendors(): JSX.Element {
    const { loading, error, data } = useQuery<VendorProps>(GET_VENDORS_QUERY);

    if (loading) {
        return <LoadingKeyboard />;
    }

    if (error) {
        console.error(error);
        return <Error title="Oops, small mistake here..." statusCode={502} />;
    }

    const { vendors } = data;

    function generateAccumArray<T>(len: number) {
        let arr = [];
        for (let i = 0; i < len; i++) {
            arr.push([]);
        }
        return (arr as unknown) as T;
    }

    // make list of unique present vendor continents
    const availableContinents = vendors
        .map((v) => v.country)
        .reduce<string[]>((res, country) => {
            const continentCode = country.split('-')[0];
            // only take the first of the possibly 2 codes to prevent undefined key
            const con1 = continentCode.split(',')[0];

            if (!res.includes(con1)) {
                res.push(con1);
            }

            return res;
        }, []);

    const totalAcc = generateAccumArray<string[][]>(availableContinents.length);

    // filter all vendor objects by key 'country', push all vendors to dedicated continent array
    const filteredVendorLists = vendors.reduce((accum, vendor) => {
        availableContinents.map((continent, jdx) => {
            // if 2 continentcodes are listed, the vendor gets put in the section of the continentcode that's listed first
            const continentCode = vendor.country.split('-')[0];
            const con1 = continentCode.split(',')[0];

            if (con1 === continent) {
                accum[jdx].push((vendor as unknown) as string);
            }
        });

        return accum;
    }, totalAcc);

    const sortedVendors = filteredVendorLists.reduce((sortedVendors, field, index) => {
        sortedVendors[availableContinents[index]] = field;

        // add continent display label to vendor
        countryIsoList.forEach((countryIso) => {
            if (availableContinents[index] === 'ALL') {
                sortedVendors[availableContinents[index]].label = 'Worldwide';
            }
            if (countryIso.continentCode === availableContinents[index]) {
                sortedVendors[availableContinents[index]].label = countryIso.continentName;
            }
        });

        return sortedVendors;
    }, {});

    const title = `keycapset vendors`;
    const description = `A list of vendors selling keycapsets, keycaps and keyboard.`;

    return (
        <div className="container">
            <Meta title={title} description={description} />
            <Heading mainTitle="Vendors" subTitle="Available vendors." />
            {Object.keys(sortedVendors).map((key) => (
                <div className="continent-section">
                    <div className="continent-bar">
                        <h2 className={'no-bold left'}> {sortedVendors[key].label} </h2>
                    </div>

                    <div className="images-container">
                        {sortedVendors[key].map((vendor: Vendor) => (
                            <VendorCard vendor={vendor} key={vendor._id} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

Vendors.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default withGA('UA-115865530-2', Router)(Vendors);
