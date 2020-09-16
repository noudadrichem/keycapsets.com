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
                <Heading mainTitle="Find your favorite keycapset!" subTitle="" isHome />
                <Filters />
                <Overview />
                <BackToTop />
            </div>
            {/* <CTACard /> */}
        </>
    );
}

// export async function getServerSideProps(context) {
//     console.log(context.query)

//     return { props: { }}
//     // try {
//     //     const client = initializeApollo();
//     //     const { data, error } = await client.query({
//     //         query: GET_SINGLE_SET_QUERY,
//     //         variables: {
//     //             slug: context.query.set,
//     //         },
//     //     });

//     //     return {
//     //         props: {
//     //             isLargeContainer: false,
//     //             keycapset: data.keycapsetBySlug,
//     //         },
//     //     };
//     // } catch (err) {
//     //     console.log('SSR props err', err);
//     // }

//     // return {
//     //     props: { isLargeContainer: false },
//     // };
// }

export default withGA('UA-115865530-2', Router)(Home);
