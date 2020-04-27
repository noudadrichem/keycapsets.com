import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import withData from '../../hooks/withData';

import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Heading from '../../components/Heading';
import RedditAuth from '../../components/RedditAuth';

function SignUpReddit() {
    return (
        <div className="page google-sign-up">
            <div className="container">
                <Heading
                    mainTitle="Sign up with your Reddit account"
                    subTitle="Favorite your sets and stay up to date!"
                />
                <div className="flex align center">
                    <RedditAuth text="Sign up with Reddit" />
                </div>
            </div>
        </div>
    );
}

export default withGA('UA-115865530-2', Router)(withData(SignUpReddit));
