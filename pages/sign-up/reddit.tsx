import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import '../../assets/styles/main.scss';

import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import withData from '../../hooks/withData';

function SignUpReddit() {
    return (
        <>
            <Nav />
            <div className="container">
                <h1>Reddit</h1>
            </div>
            <Footer />
        </>
    );
}

export default withGA('UA-115865530-2', Router)(withData(SignUpReddit));
