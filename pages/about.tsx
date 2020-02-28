import React from 'react';
import Head from 'next/head';

import '../assets/styles/main.scss';

import withData from '../hooks/withData';
import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import LoadingKeyboard from '../components/LoadingKeyboard';
import ButtonLink from '../components/ButtonLink';


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
                        We were always surfing and browsing trough several websites like Geekhack and vendor sites. There came the idea, just one website to rule them all. <br/>
                        Just one website with an 'simple' overview of keysets that exist or soon to be existing. I don't want to be a vendor. Let this site be a proxy.
                    </p>

                    <h4 className="alinea-title">The Future for set designers</h4>
                    <p className="light alinea">
                        I want set designers to be able to express themselves more easily. <br/>Dear set designer,Let this platform work for you!. I want to make it possible to easily be able to get you a single webpage with all the necessary info. Such as vendors, renders, previews etc.
                    </p>

                    <h4 className="alinea-title">The Future for explorers</h4>
                    <p className="light alinea">
                        This should be The website you will go to, to search for keycap sets. Either trough a name, type or color. Yes color. I want to create a color searchable system so you can easily decide what set should go with your next build.
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

export default withData(About);
