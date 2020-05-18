import React, { ReactNode, useContext, useEffect } from 'react';
import Link from 'next/link';

import Button from './Button';
import GoogleIcon from './GoogleIcon';
import RedditIcon from './RedditIcon';
import { InititalState, Context } from 'typings';
import { context } from '../context';
import UserProfileTag from './UserProfileTag';
import Logo from './Logo';
import Pill from './Pill';

interface NavProps {
    isLargeContainer?: boolean;
}

function Nav(props: NavProps): JSX.Element {
    const { isLargeContainer } = props;
    const { state } = useContext<Context>(context);
    const { isLoggedIn }: InititalState = state;
    return (
        <nav className="nav">
            {/* <a className="discord-banner" href="https://discord.gg/dq8cyMS">
                <img src="/images/discord.svg" />Join the conversation on our discord!
            </a>*/}
            {/* <div className="maintenance-banner">
                In the weekend of 16th and 17th may I'll be doing some "big" maintenance, this could result in some
                downtime. I'm sorry in advance. ❤️
        </div> */}

            <div className={`container ${isLargeContainer ? 'large' : ''}`}>
                <div className="nav-container">
                    <div className="logo">
                        <Link href="/" as="/">
                            <a className="">
                                <Logo width={106} />
                            </a>
                        </Link>
                        <Pill color="gray" text="BETA" />
                    </div>

                    <div className="nav-items">
                        <Link href="/vendors" as="/vendors" prefetch>
                            <a className="nav-item">Vendors</a>
                        </Link>
                        <Link href="/about" as="/about" prefetch>
                            <a className="nav-item">About</a>
                        </Link>
                        {!isLoggedIn ? (
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
