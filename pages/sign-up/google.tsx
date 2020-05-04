import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import withData from '../../hooks/withData';

import Heading from '../../components/Heading';
import GoogleAuth from '../../components/GoogleAuth';

function SignUpGoogle() {
    return (
        <div className="page google-sign-up">
            <div className="container">
                <Heading mainTitle="Sign up with Google" subTitle="Favorite your sets and stay up to date!" />
                <div className="flex align center">
                    <GoogleAuth text="Sign up with Google" />
                </div>
            </div>
        </div>
    );
}

export default withGA('UA-115865530-2', Router)(withData(SignUpGoogle));
