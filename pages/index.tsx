import withGA from 'next-ga';
import { Router } from 'next/router';
import React from 'react';

import '../assets/styles/main.scss';

import BackToTop from '../components/BackToTop';
import Heading from '../components/Heading';
import Overview from '../components/Overview';
import Meta from '../components/Meta';
import Filters from '../components/Filters';

function Home() {
    return (
        <>
            <Meta />
            <div className="container large">
                <Heading isHome mainTitle="Find your favorite keycapset" subTitle="" />
                <Filters />
                <Overview />
                <BackToTop />
            </div>
            {/* <CTACard /> */}
        </>
    );
}

export default withGA('UA-115865530-2', Router)(Home);
