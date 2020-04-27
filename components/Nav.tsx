import React, { ReactNode, useContext } from 'react';
import Link from 'next/link';

import Button from './Button';
import GoogleIcon from './GoogleIcon';
import RedditIcon from './RedditIcon';
import { InititalState, Context } from 'typings';
import { context } from '../context';
import UserProfileTag from './UserProfileTag';

interface NavProps {
    isLargeContainer?: boolean;
}

function Nav(props: NavProps): JSX.Element {
    const { isLargeContainer } = props;
    const { state } = useContext<Context>(context);

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
                            <a className="nav-item">Vendors</a>
                        </Link>
                        <Link href="/about" as="/about">
                            <a className="nav-item">About</a>
                        </Link>
                        {!state.isLoggedIn ? (
                            <Button variant="primary" size="md" className="btn-sign-up medium-large">
                                Sign up
                                <div className="popover on-hover">
                                    <div className="popover-container">
                                        <Link href="/sign-up/google">
                                            <a className="item">
                                                <GoogleIcon variant="dark" />
                                                Sign up with Google
                                            </a>
                                        </Link>
                                        <Link href="/sign-up/reddit">
                                            <a className="item">
                                                <RedditIcon variant="dark" />
                                                Sign up with Reddit
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </Button>
                        ) : (
                            <UserProfileTag />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
