import React from 'react';
import Head from 'next/head';

import '../assets/styles/main.scss';

import withData from '../hooks/withData';
import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import LoadingKeyboard from '../components/LoadingKeyboard';


interface AboutProps { }

function About(props: AboutProps) {
    const title = `About Keycapsets`;
    const description = `Made for love of mech keebs, and the trouble of finding a nice overview!`;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" key="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.00, minimum-scale=1.00" />
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
                    mainTitle="About keycapsets"
                    subTitle="Made for love of mech keebs, and the trouble of finding a nice overview!"
                    left
                />

                {/* <div>
                    <p>Curabitur in accumsan lorem. Donec ut sodales metus. Duis nec metus aliquet leo facilisis vehicula. Nullam quam lectus, aliquet feugiat consequat quis, fermentum ullamcorper risus. Pellentesque feugiat erat tincidunt maximus tempus. Duis at quam dolor. Curabitur ac turpis nulla.</p>
                </div> */}

                <Footer />
            </div>
        </>
    )
}

export default withData(About);
