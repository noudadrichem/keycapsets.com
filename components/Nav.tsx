import React, { ReactNode } from 'react';
import Link from 'next/link';

import Button from './Button';
import GoogleIcon from './GoogleIcon';
import RedditIcon from './RedditIcon';
import GoogleAuth from './GoogleAuth';
import RedditAuth from './RedditAuth';

interface NavProps {
    isLargeContainer?: boolean;
}

function Nav(props: NavProps): JSX.Element {
    const { isLargeContainer } = props;

    return (
        <nav className="nav">
            {/* <a className="discord-banner" href="https://discord.gg/dq8cyMS">
                <img src="/images/discord.svg" />Join the conversation on our discord!
            </a> */}
            <div className={`container ${isLargeContainer ? 'large' : ''}`}>
                <div className="nav-container">
                    <div className="logo">
                        <Link href="/" as="/">
                            <a>
                                <img src="/images/logo-dark.svg" />
                            </a>
                        </Link>
                    </div>

                    <div className="nav-items">
                        <Link href="/vendors" as="/vendors">
                            <a>Vendors</a>
                        </Link>
                        <Link href="/about" as="/about">
                            <a>About</a>
                        </Link>

                        <Button variant="primary" size="md" className="btn-sign-up medium-large">
                            Sign up
                            <div className="pop-over">
                                <div className="pop-over-container">
                                    <Link href="/sign-up/google">
                                        <GoogleAuth asLink />
                                    </Link>
                                    <Link href="/sign-up/reddit">
                                        <RedditAuth asLink />
                                    </Link>
                                </div>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
