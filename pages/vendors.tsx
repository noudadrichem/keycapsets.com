import React, { useState, useEffect, useContext } from 'react';
import Error from 'next/error';
import { useQuery } from '@apollo/react-hooks';
import withGA from 'next-ga';
import Router from 'next/router';

import withData from '../hooks/withData';
import Context from '../context';
import { GET_VENDORS_QUERY } from '../queries';
import { Vendor } from 'typings';

import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import LoadingKeyboard from '../components/LoadingKeyboard';
import VendorCard from '../components/VendorCard';
import Meta from '../components/Meta';
import CTACard from '../components/CTACard';

import '../assets/styles/main.scss';
import '../assets/styles/vendors.scss';
import countryIsoList from '../assets/countries';
import Head from 'next/head';

interface VendorProps {}

function Vendors(props: VendorProps): JSX.Element {
    const { loading, error, data } = useQuery(GET_VENDORS_QUERY);

    if (loading) {
        return <LoadingKeyboard />;
    }

    if (error) {
        console.error(error);
        return <Error title="Oops, small mistake here..." statusCode={502} />;
    }

    const vendors = data.vendors;

    function generateAccumArray(len) {
        let arr = [];
        for (let i = 0; i < len; i++) {
            arr.push([]);
        }
        return arr;
    }

    // make list of unique present vendor continents
    const availableContinents = vendors
        .map((v) => v.country)
        .reduce((res, country) => {
            const continentCode = country.split('-')[0];
            // only take the first of the possibly 2 codes to prevent undefined key
            const con1 = continentCode.split(',')[0];

            if (!res.includes(con1)) {
                res.push(con1);
            }

            return res;
        }, []);

    let totalAcc = generateAccumArray(availableContinents.length);

    // filter all vendor objects by key 'country', push all vendors to dedicated continent array
    const filteredVendorLists = vendors.reduce((accum, vendor) => {
        availableContinents.map((continent, jdx) => {
            // if 2 continentcodes are listed, the vendor gets put in the section of the continentcode that's listed first
            const continentCode = vendor.country.split('-')[0];
            const con1 = continentCode.split(',')[0];

            if (con1 === continent) {
                accum[jdx].push(vendor);
            }
        });

        return accum;
    }, totalAcc);

    var sortedVendors = filteredVendorLists.reduce(function (
        sortedVendors,
        field,
        index
    ) {
        sortedVendors[availableContinents[index]] = field;

        // add continent display label to vendor
        countryIsoList.forEach((countryIso) => {
            if (availableContinents[index] === 'ALL') {
                sortedVendors[availableContinents[index]].label = 'Worldwide';
            }
            if (countryIso.continentCode === availableContinents[index]) {
                sortedVendors[availableContinents[index]].label =
                    countryIso.continentName;
            }
        });

        return sortedVendors;
    },
    {});

    return (
        <>
            <Meta />
            <Nav />
            <div className="container">
                <Heading mainTitle="Vendors" subTitle="Available vendors." />
                {Object.keys(sortedVendors).map((key) => (
                    <div className="continent-section">
                        <div className="continent-bar">
                            <h2 className={'no-bold left'}>
                                {' '}
                                {sortedVendors[key].label}{' '}
                            </h2>
                        </div>

                        <div className="images-container">
                            {sortedVendors[key].map((vendor: Vendor) => (
                                <VendorCard vendor={vendor} key={vendor._id} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
            <CTACard />
        </>
    );
}

export default withGA('UA-115865530-2', Router)(withData(Vendors));
