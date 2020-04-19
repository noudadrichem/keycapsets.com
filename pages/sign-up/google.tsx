import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import '../../assets/styles/main.scss';

import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

function SignUpGoogle() {
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

export default withGA('UA-115865530-2', Router)(SignUpGoogle);
