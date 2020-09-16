import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import Heading from '../components/Heading';
import Link from 'next/link';
import GoogleIcon from '../components/GoogleIcon';
import RedditIcon from '../components/RedditIcon';
import GoogleAuth from '../components/GoogleAuth';
import RedditAuth from '../components/RedditAuth';
import Meta from '../components/Meta';

function Login() {
    return (
        <div className="container sign-up">
            <Meta />
            <Heading mainTitle="Login on keycapsets" subTitle="Welcome back, enjoy the platform!" left />

            <div className="cards">
                <div className="card center">
                    <Link href="/sign-up/google">
                        <a>
                            <GoogleIcon variant="dark" size={64} />
                            <GoogleAuth disabled={false} text="Login with Google" />
                        </a>
                    </Link>
                </div>

                <div className="card center">
                    <Link href="/sign-up/reddit">
                        <a>
                            <RedditIcon variant="dark" size={64} />
                            <RedditAuth disabled={false} text="Login with Reddit" />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

Login.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default withGA('UA-115865530-2', Router)(Login);
