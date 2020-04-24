import React, { useContext } from 'react';
import { Router, NextRouter, useRouter } from 'next/router';
import withGA from 'next-ga';

import '../../assets/styles/main.scss';

import withData from '../../hooks/withData';

import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Heading from '../../components/Heading';
import GoogleAuth from '../../components/GoogleAuth';
import { InititalState } from 'typings';
import Context from '../../context';
import RedditAuth from '../../components/RedditAuth';

function SignUpGoogle() {
    const router: NextRouter = useRouter();
    const context: InititalState = useContext(Context);

    async function callback(success: boolean) {
        if (success) {
            await context.setGlobalState({ isLoggedIn: true });
            console.log('Reddit success...', context);
            // router.push('/');
        }
    }

    return (
        <div className="page google-sign-up">
            <Nav />
            <div className="container">
                <Heading
                    mainTitle="Sign up with your Reddit account"
                    subTitle="Favorite your sets and stay up to date!"
                />
                <div className="flex align center">
                    <RedditAuth text="Sign up with Reddit" callback={callback} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default withGA('UA-115865530-2', Router)(withData(SignUpGoogle));
