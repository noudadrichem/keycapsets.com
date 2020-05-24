import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import Button from './Button';
import GoogleIcon from './GoogleIcon';
import RedditIcon from './RedditIcon';
import { InititalState, Context } from 'typings';
import { context } from '../context';
import UserProfileTag from './UserProfileTag';
import Logo from './Logo';
import Pill from './Pill';
import { NextRouter, useRouter } from 'next/router';

interface NavProps {
    isLargeContainer?: boolean;
}

const HamburgerIcon = ({ size = 24, color = '#232323', onClick }) => (
    <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        className="hamburger-icon"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

function Nav(props: NavProps): JSX.Element {
    const { isLargeContainer } = props;
    const { state } = useContext<Context>(context);
    const { isLoggedIn }: InititalState = state;
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const router: NextRouter = useRouter();

    useEffect(
        function listenToRouteChange() {
            setIsNavOpen(false);
        },
        [router.route]
    );

    useEffect(() => {
        document.body.style.overflow = isNavOpen ? 'hidden' : '';
    }, [isNavOpen]);

    return (
        <nav className="nav">
            {/* <a className="discord-banner" href="https://discord.gg/dq8cyMS">
                <img src="/images/discord.svg" />Join the conversation on our discord!
            </a>*/}
            {/* <div className="maintenance-banner">
                In the weekend of 16th and 17th may I'll be doing some "big" maintenance, this could result in some
                downtime. I'm sorry in advance. ❤️
        </div> */}

            <HamburgerIcon
                onClick={() => {
                    setIsNavOpen(!isNavOpen);
                }}
            />

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

                    <div className={`nav-items ${isNavOpen ? 'open' : 'closed'}`}>
                        <Link href="/vendors" as="/vendors" prefetch>
                            <a className="nav-item">Vendors</a>
                        </Link>
                        <Link href="/about" as="/about" prefetch>
                            <a className="nav-item">About</a>
                        </Link>
                        {!isLoggedIn && (
                            <Link href="/login" as="/login" prefetch>
                                <a className="nav-item">Login</a>
                            </Link>
                        )}
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
