import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

import Heading from '../../components/Heading';
import Meta from '../../components/Meta';

interface InterestCheckHomeProps {}

function InterestCheckHome() {
    const title = `Run your interest check with Keycapsets`;
    const description = `Interested in running your interest check in a modern way? Run your keycapset interest check via keycapsets.com and be sure to get the right analytics directly onto your screen!`;
    return (
        <>
            <Meta title={title} description={description} />
            <div className="interest-check container">
                <Heading mainTitle={title} subTitle={description} left />
            </div>
        </>
    );
}

InterestCheckHome.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default withGA('UA-115865530-2', Router)(InterestCheckHome);
