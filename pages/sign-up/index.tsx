import React from 'react';
import { Router, useRouter } from 'next/router';
import withGA from 'next-ga';

import Heading from '../../components/Heading';
import Link from 'next/link';
import GoogleIcon from '../../components/GoogleIcon';
import RedditIcon from '../../components/RedditIcon';
import Button from '../../components/Button';

function SignUp() {
    const router = useRouter();
    return (
        <div className="container sign-up">
            <Heading mainTitle="Sign up with either Google or Reddit" subTitle="" left />

            <div className="features-container">
                <h3>Features</h3>
                <ul className="features">
                    <li>Favorite sets, see your collection. </li>
                    <li>Create your own collections for e.g. your board. *</li>
                    <li>Opt into groupbuy updates via mail. *</li>
                    <li>Upload a keycapset. *</li>
                    <li>Collect IC votes. *</li>
                    <li>Get a full fledged designed page for your set. *</li>
                    <li>Hook up to vendors to get your MOQ data in one place. *</li>
                </ul>
            </div>

            <div className="cards">
                <div className="card center">
                    <Link
                        href={`/sign-up/google${router.query.next !== undefined ? `?next=${router.query.next}` : ''}`}
                    >
                        <a>
                            <GoogleIcon variant="dark" size={64} />
                            <Button variant="primary" size="sm">
                                Sign up via Google
                            </Button>
                        </a>
                    </Link>
                </div>

                <div className="card center">
                    <Link
                        href={`/sign-up/reddit${router.query.next !== undefined ? `?next=${router.query.next}` : ''}`}
                    >
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
                By creating an account via Google you're able to favorite keycapsets and have a simple overview of what
                you like and might want to use for your next build. You could vote on ICs. * You could opt-in on
                recieving weekly or monthly updates via email. *
            </p>

            <p className="light small-width alinea">
                Are you a designer? Sign up and upload your sets. Collect IC votes and get a beautiful (partly self
                designed) page to promote your sets on various platforms! *
            </p>

            <p className="light small-width alinea">
                Are you a vendor? Sign up and let users know you exist! Are you a vendor designing sets? Obviously all
                the above apply for you aswell! *
            </p>

            <p className="light small-width alinea">* Feature coming!</p>
        </div>
    );
}

SignUp.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default withGA('UA-115865530-2', Router)(SignUp);
