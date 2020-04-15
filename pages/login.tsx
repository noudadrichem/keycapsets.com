import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import '../assets/styles/main.scss';

import GoogleAuth from '../components/GoogleAuth';

function Loading() {
    return (
        <>
            <h1>Login</h1>

            <GoogleAuth />
        </>
    );
}

export default withGA('UA-115865530-2', Router)(Loading);
