import React from 'react';
import Link from 'next/link';

import Logo from './Logo';

interface NavProps {
    isLargeContainer?: boolean;
}

function Nav(props: NavProps): JSX.Element {
    const { isLargeContainer } = props;

    return (
        <nav className="nav">
            {/* <a className="discord-banner" href="https://discord.gg/dq8cyMS">
                <img src="/images/discord.svg" /> Join the conversation on our discord!
            </a> */}
            <div className="maintenance-banner">
                In the weekend of 16th and 17th may I'll be doing some "big" maintenance, this could result in some
                downtime. I'm sorry in advance. ❤️
            </div>

            <div className={`container ${isLargeContainer ? 'large' : ''}`}>
                <div className="nav-container">
                    <div className="logo">
                        <Link href="/" as="/">
                            <a className="logo">
                                <Logo width={106} />
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
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
