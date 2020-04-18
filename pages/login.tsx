import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import '../assets/styles/main.scss';

import GoogleAuth from '../components/GoogleAuth';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function Loading() {
    return (
        <>
            <Nav />
            <div className="container">
                <GoogleAuth />
            </div>

            <Footer />
        </>
    );
}

export default withGA('UA-115865530-2', Router)(Loading);
