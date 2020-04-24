import React, { ReactNode, useContext } from 'react';
import Link from 'next/link';

import Button from './Button';
import GoogleIcon from './GoogleIcon';
import RedditIcon from './RedditIcon';
import { InititalState } from 'typings';
import Context from '../context';

interface NavProps {
    isLargeContainer?: boolean;
}

function Nav(props: NavProps): JSX.Element {
    const { isLargeContainer } = props;
    const { isLoggedIn }: InititalState = useContext(Context);

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
                        {!isLoggedIn && (
                            <Button variant="primary" size="md" className="btn-sign-up medium-large">
                                Sign up
                                <div className="pop-over">
                                    <div className="pop-over-container">
                                        <Link href="/sign-up/google">
                                            <a>
                                                <GoogleIcon variant="dark" />
                                                Sign up with Google
                                            </a>
                                        </Link>
                                        <Link href="/sign-up/reddit">
                                            <a>
                                                <RedditIcon variant="dark" />
                                                Sign up with Reddit
                                            </a>
                                        </Link>
                                        {/* <GoogleAuth asLink />

                                    <RedditAuth asLink /> */}
                                    </div>
                                </div>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
