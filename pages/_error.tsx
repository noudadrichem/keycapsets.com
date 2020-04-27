import React from 'react';
import Head from 'next/head';
import withGA from 'next-ga';
import Router from 'next/router';

import '../assets/styles/main.scss';

import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Meta from '../components/Meta';

interface ErrorProps {
    statusCode?: string;
}

function Error(props: ErrorProps) {
    const { statusCode } = props;
    const title = `Error Keycapsets`;
    const description = `This page doesn't exist...`;

    return (
        <div className="container">
            <Heading
                mainTitle={statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
                subTitle="This page does not exist..."
                backgroundColor="#f8abab"
                left
            />
        </div>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default withGA('UA-115865530-2', Router)(Error);
