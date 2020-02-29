import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import withGA from 'next-ga';

import '../assets/styles/main.scss';

import withData from '../hooks/withData';
import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import ButtonLink from '../components/ButtonLink';


interface AboutProps { }

function About(props: AboutProps) {
    const title = `About Keycapsets`;
    const description = `Made for love of mechanical keyboard, and the trouble of finding a nice overview of keycapsets!`;

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
            <div className="about container">
                <Heading
                    mainTitle="About keycapsets"
                    subTitle="Made for love of mech keebs, and the trouble of finding a suitable keycapset overview!"
                    left
                />

                <div className="text-container">

                    <div style={{ margin: '0 0 64px 0' }}>
                        <ButtonLink isLarge href="mailto://info@noudadrichem.com">Leave me some feedback!</ButtonLink>
                    </div>

                    <h4 className="alinea-title">Intro</h4>
                    <p className="light alinea">
                        Friends came to me enthusiastic about mechanical keyboards. I'm always in to help them find their best keyboard. The second step is ofcource, a nice keyset!
                    </p>

                    <p className="light alinea">
                        We were surfing and browsing through several websites like Geekhack and other vendor sites. This is where the idea came to mind. One website to rule them all. Just one website with an overview of keysets that are available or will be available soon. I don't want to be a vendor. Let this site be a proxy to your vendor.
                    </p>

                    <h4 className="alinea-title">For vendors</h4>
                    <p className="light alinea">
                        This site should be an advantage to your business. From overview to single I'll proxy the user to their vendor. There will be an overview page with vendors categorised by country and continent.
                    </p>

                    <h4 className="alinea-title">The Future for set designers</h4>
                    <p className="light alinea">
                        I want to make it easier for you as a designer to express yourself. <br/> My goal is to make it possible for you to have a single webpage with all the information you need. Such as vendors, renders, previews etc.
                    </p>

                    <h4 className="alinea-title">The Future for explorers</h4>
                    <p className="light alinea">
                        This should be your go-to website to look for keycap sets. I want you to be able to search based on name, type or even the color you like. I want to make it as easy as possible for you to decide what set you should go with on your next build.
                    </p>

                    <h4 className="alinea-title">The person behind</h4>
                    <p className="light alinea">
                        I'm Noud Adrichem, a 21 year old mechanical keyboard enthusiast. Stu-dying Software Engineering at Hogeschool Utrecht and working as a Software Engineer at <a href="https://bannerwise.io">Bannerwise.io</a>.
                    </p>

                </div>

                <Footer />
            </div>
        </>
    )
}

export default withGA('UA-115865530-2', Router)(withData(About));
