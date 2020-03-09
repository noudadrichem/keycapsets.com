import React, { useState, useEffect, useContext } from 'react';
import Error from 'next/error'
import { useMutation, useQuery } from '@apollo/react-hooks';
import withGA from 'next-ga';
import Router from 'next/router';

import { GET_VENDORS_QUERY } from '../queries';

import withData from '../hooks/withData';

import Heading from '../components/Heading';
import Footer from '../components/Footer';

import '../assets/styles/main.scss';
import {Keycapset, Vendor} from 'typings';
import Nav from '../components/Nav';
import LoadingKeyboard from '../components/LoadingKeyboard';
import ImageCard from "../components/ImageCard";
import VendorCard from "../components/VendorCard";

interface VendorProps {}

function Vendors(props: VendorProps):JSX.Element {
    const { loading, error, data } = useQuery(GET_VENDORS_QUERY);
    console.log("Data: ", data);

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

            <div className="images-container">
                {
                    data.vendors
                        .map((vendor: Vendor) =>
                            <VendorCard {...{vendor}} key={vendor._id} />
                        )
                }
            </div>

            <Footer />
        </>
    )
}

export default withGA('UA-115865530-2', Router)(withData(Vendors));
