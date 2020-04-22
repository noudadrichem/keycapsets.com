import React from 'react';
import { Router, NextRouter, useRouter } from 'next/router';
import withGA from 'next-ga';

import '../../assets/styles/main.scss';

import withData from '../../hooks/withData';

import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

function SignUpGoogle() {
    const router: NextRouter = useRouter();
    console.log(router);

    return (
        <>
            <Nav />
            <div className="container">
                <h1>Google</h1>
            </div>
            <Footer />
        </>
    );
}

export default withGA('UA-115865530-2', Router)(withData(SignUpGoogle));
