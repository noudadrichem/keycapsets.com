import React, { useEffect } from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

import Heading from '../../components/Heading';
import Meta from '../../components/Meta';

interface InterestCheckHomeProps {}

function InterestCheckHome() {
    useEffect(() => {
        Router.push('/promote-your-keycapset');
    });

    return null;
}

export default withGA('UA-115865530-2', Router)(InterestCheckHome);
