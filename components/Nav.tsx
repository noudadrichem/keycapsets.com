import React, { ReactNode } from 'react'
import Link from 'next/link';

import '../assets/styles/nav.scss';

interface NavProps {
    isLargeContainer?: boolean;
}

function Nav(props: NavProps): JSX.Element {
    const { isLargeContainer } = props;

    return (
        <nav className="nav">
            <div className={`container ${isLargeContainer ? 'large' : ''}`}>
                <div className="nav-container">
                    <div>
                        <Link href="/" as="/">
                            <img src="/images/logo-dark.svg" />
                        </Link>
                    </div>

                    <div>
                        <Link href="/upload" as="/upload">
                            <a>Upload</a>
                        </Link>
                        <Link href="/about" as="/about">
                            <a>Get to know</a>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
