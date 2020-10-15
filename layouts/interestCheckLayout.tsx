import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

import '../assets/styles/interestcheck.scss';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Pill from '../components/Pill';
import Plus from '../components/PlusIcon';
import useInterestCheckStore from '../hooks/useInterestCheckStore';

interface InterestCheckLayoutProps {
    children: any;
}

function InterestCheckLayout(props: InterestCheckLayoutProps) {
    const accentColor2 = useInterestCheckStore<any>((state) => state.keycapset?.accentColor2);
    const router = useRouter();

    function back() {
        router.push(router.asPath.replace('ic', 'set'));
    }

    return (
        <div className="interest-check">
            <div className="interest-check-topbar" style={{ backgroundColor: accentColor2 }}></div>
            <div className="interest-check-nav">
                <div className="logo">
                    <Link href="/" as="/">
                        <a className="">
                            <Logo width={80} />
                        </a>
                    </Link>
                </div>
                <span onClick={back}>
                    <Plus rotation={45} size={24} />
                </span>
            </div>

            <div className="interest-check-container container">{props.children}</div>

            <Footer />
        </div>
    );
}

export default InterestCheckLayout;
