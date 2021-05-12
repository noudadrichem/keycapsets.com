import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import Button from './Button';
import GoogleIcon from './GoogleIcon';
import RedditIcon from './RedditIcon';
import useStore from '../context';
import Logo from './Logo';
import { NextRouter, useRouter, Router } from 'next/router';
import dynamic from 'next/dynamic';
import Pill from './Pill';
import useModalStore, { Modals } from '../hooks/useModalStore';

const UserProfileTag = dynamic(() => import('./UserProfileTag'), { ssr: false });
const DarkModeSwitch = dynamic(() => import('./DarkModeSwitch'), { ssr: false });

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
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    const isDarkMode = useStore((s) => s.isDarkMode);
    const openModal = useModalStore((s) => s.openModal);

    function contactKCS() {
        openModal(Modals.Contact);
    }
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
        router.push('/sign-up');
    }

    return (
        <>
            {/* <a className="discord-banner" href="https://discord.gg/dq8cyMS">
                <img src="/images/discord.svg" />Join the conversation on our discord!
            </a> */}
            {/* <div className="info-banner">New: Dark mode and optimized search!</div> */}
            <nav className="nav">
                <HamburgerIcon
                    color={isDarkMode ? '#f8fafb' : '#364154'}
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
                            {/* <Pill color="gray" text="BETA" /> */}
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
                                <Button variant="primary" size="md" className="btn-sign-up desktop-only" onClick={pushSignup}>
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
                                <UserProfileTag isNavOpen={isNavOpen} />
                            )}

                            {!isLoggedIn && (
                                <Link href="/sign-up">
                                    <a className="nav-item mobile-only" style={{ flex: 0 }}>
                                        Sign up
                                    </a>
                                </Link>
                            )}

                            <DarkModeSwitch />

                            <div className="nav-footer mobile-only">
                                <div className="made-in">
                                    <p>
                                        &copy; Made with <a href="https://bunq.me/noudadrichem/3/I'm%20liking%20keycapsets!">☕</a> in
                                        Utrecht.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;
