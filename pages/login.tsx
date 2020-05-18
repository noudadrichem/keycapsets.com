import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import withData from '../hooks/withData';
import Heading from '../components/Heading';
import Link from 'next/link';
import GoogleIcon from '../components/GoogleIcon';
import RedditIcon from '../components/RedditIcon';
import Button from '../components/Button';
import GoogleAuth from '../components/GoogleAuth';
import RedditAuth from '../components/RedditAuth';

function Login() {
    return (
        <div className="container sign-up">
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

export default withGA('UA-115865530-2', Router)(withData(Login));
