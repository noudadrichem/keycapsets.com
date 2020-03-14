import React, { useState, useEffect, useContext } from 'react';
import Error from 'next/error'
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import withGA from 'next-ga';
import Router from 'next/router';

import { GET_VENDORS_QUERY } from '../queries';

import withData from '../hooks/withData';

import Heading from '../components/Heading';
import Footer from '../components/Footer';

import '../assets/styles/main.scss';
import { Vendor } from 'typings';
import Nav from '../components/Nav';
import LoadingKeyboard from '../components/LoadingKeyboard';

interface VendorProps {}

function Vendors(props: VendorProps):JSX.Element {
    const { loading, error, data } = useQuery(GET_VENDORS_QUERY);
    console.log("Data: ", data)

    if (loading) {
        return <LoadingKeyboard />
    }

    if (error) {
        console.error(error);
        return <Error title="Oops, small mistake here..." statusCode={502} />
    }

    return (
        <>
            <Nav />
            <Heading
                mainTitle="Vendors"
                subTitle="All available vendors."
            />
            {data.vendors.length > 0
            ?
                data.vendors
                    .map((vendor: Vendor) =>
                        <h1>{vendor.name}</h1>
                    )
            : <div className="container">
                <p>No vendors here...</p>
            </div>
            }

            <Footer />
        </>
    )
}

export default withGA('UA-115865530-2', Router)(withData(Vendors));
