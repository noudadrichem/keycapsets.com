import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import '../assets/styles/main.scss';

import Footer from '../components/Footer';
import Logo from '../components/Logo';
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
                <a onClick={back} className="btn-back-to-set">
                    <span className="msg">Go back to set page</span>
                    <Plus rotation={45} size={24} />
                </a>
            </div>

            <div className="interest-check-container container">{props.children}</div>

            <Footer />
        </div>
    );
}

export default InterestCheckLayout;
