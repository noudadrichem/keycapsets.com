import React from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import withData from '../../hooks/withData';
import Heading from '../../components/Heading';
import Link from 'next/link';
import GoogleIcon from '../../components/GoogleIcon';
import RedditIcon from '../../components/RedditIcon';
import Button from '../../components/Button';

function SignUp() {
    return (
        <div className="container sign-up">
            <Heading mainTitle="Sign up with either Google or Reddit" subTitle="" left />

            <div className="features-container">
                <h3>Features</h3>
                <ul className="features">
                    <li>Favorite sets, see your collection. </li>
                    <li>Create your own collections for e.g. your board.(Coming)</li>
                    <li>Opt into groupbuy updates via mail (Coming)</li>
                    <li>Upload a keycapset(Coming (again))</li>
                    <li>Collect IC votes.(Coming)</li>
                    <li>Get a full fledged designed page for your set.(Coming)</li>
                    <li>Sign up to a calender feed.(Coming)</li>
                    <li>Hook up to vendors to get your MOQ data in 1 place.(Coming)</li>
                </ul>
            </div>

            <div className="cards">
                <div className="card center">
                    <Link href="/sign-up/google">
                        <a>
                            <GoogleIcon variant="dark" size={64} />
                            <Button variant="primary" size="sm">
                                Sign up via Google
                            </Button>
                        </a>
                    </Link>
                </div>

                <div className="card center">
                    <Link href="/sign-up/reddit">
                        <a>
                            <RedditIcon variant="dark" size={64} />
                            <Button variant="primary" size="sm">
                                Sign up via Reddit
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>

            <h3>Details</h3>
            <p className="light small-width alinea">
                By creating an account on keycapsets.com you're able to favorite your keycapsets, have an easy to go
                overview of what you like and might want to use for your next build. You could vote on ICS (Coming) You
                could opt in on recieving weekly or monthly updates via email (Coming).
            </p>

            <p className="light small-width alinea">
                Are you a designer? Sign up and upload your keycapsets. Collect IC votes and get a beautiful partly self
                designed page to promote your sets on various platforms! Hook up your set to your vendors and get
                insights to your MOQ data.(Coming)
            </p>

            <p className="light small-width alinea">
                Are you a vendor? Sign up and let users know know you exist! Are you a vendor designing sets? Obviously
                all the above apply for you aswell!
            </p>
        </div>
    );
}

SignUp.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default withGA('UA-115865530-2', Router)(SignUp);
