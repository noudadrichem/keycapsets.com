import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import Button from './Button';
import GoogleIcon from './GoogleIcon';
import RedditIcon from './RedditIcon';
import useStore from '../context';
import UserProfileTag from './UserProfileTag';
import Logo from './Logo';
import { NextRouter, useRouter, Router } from 'next/router';
import dynamic from 'next/dynamic';
import Pill from './Pill';

const DarkModeSwitch = dynamic(() => import('./DarkModeSwitch'), {
    ssr: false,
});

interface NavProps {
    isLargeContainer?: boolean;
    smallPadding?: boolean;
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
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const router = useRouter();
    const user = useStore<any>((state) => state.user);
    const isLoggedIn = useStore<any>((state) => state.isLoggedIn);

    useEffect(
        function listenToRouteChange() {
            setIsNavOpen(false);
        },
        [router.route]
    );

    useEffect(() => {
        document.body.style.overflow = isNavOpen ? 'hidden' : '';
    }, [isNavOpen]);

    function pushSignup(e) {
        e.preventDefault();
        console.log('push signup');
        router.push('/sign-up');
    }

    return (
        <nav className="nav">
            {/* <a className="discord-banner" href="https://discord.gg/dq8cyMS">
                <img src="/images/discord.svg" />Join the conversation on our discord!
            </a>*/}
            {/* <div className="info-banner">
                This is a new release of Keycapsets.com. We're excited to share a new feature, accounts! A version we
                could build upon with amazing new features coming ahead!
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
                        <Link href="/vendors" as="/vendors">
                            <a className="nav-item">Vendors</a>
                        </Link>
                        <Link href="/about" as="/about">
                            <a className="nav-item">About</a>
                        </Link>
                        {!isLoggedIn && (
                            <Link href="/login" as="/login">
                                <a className="nav-item">Login</a>
                            </Link>
                        )}
                        {!isLoggedIn ? (
                            <Button variant="primary" size="md" className="btn-sign-up desktop" onClick={pushSignup}>
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

                        {/* <DarkModeSwitch /> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
