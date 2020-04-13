import React from 'react';
import Head from 'next/head';
import withGA from 'next-ga';
import Router from 'next/router';

import '../assets/styles/main.scss';

import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import CTACard from '../components/CTACard';

interface ErrorProps {
    statusCode?: string;
}

function Error(props: ErrorProps) {
    const { statusCode } = props;
    const title = `Error Keycapsets`;
    const description = `This page doesn't exist...`;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    key="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.00, minimum-scale=1.00"
                />
                <meta name="author" content="noudadrichem" />
                <meta property="og:title" content={title} />
                <meta name="twitter:title" content={title} />

                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta name="twitter:description" content={description} />
            </Head>
            <Nav />
            <div className="container">
                <Heading
                    mainTitle={
                        statusCode
                            ? `An error ${statusCode} occurred on server`
                            : 'An error occurred on client'
                    }
                    subTitle="This page does not exist..."
                    backgroundColor="#f8abab"
                    left
                />

                {/* <div>
                    <p>Curabitur in accumsan lorem. Donec ut sodales metus. Duis nec metus aliquet leo facilisis vehicula. Nullam quam lectus, aliquet feugiat consequat quis, fermentum ullamcorper risus. Pellentesque feugiat erat tincidunt maximus tempus. Duis at quam dolor. Curabitur ac turpis nulla.</p>
                </div> */}
            </div>
            <Footer />
            <CTACard />
        </>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default withGA('UA-115865530-2', Router)(Error);
