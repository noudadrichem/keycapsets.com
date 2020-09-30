import { Router, useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

import '../assets/styles/interestcheck.scss';
import Footer from '../components/Footer';
import Plus from '../components/PlusIcon';
import useInterestCheckStore from '../hooks/useInterestCheckStore';

interface InterestCheckLayoutProps {
    children: any;
}

function InterestCheckLayout(props: InterestCheckLayoutProps) {
    const accentColor1 = useInterestCheckStore<any>((state) => state.keycapset?.accentColor1);
    const router = useRouter();

    function back() {
        router.push(router.asPath.replace('ic', 'set'));
    }

    return (
        <div className="interest-check">
            <div className="interest-check-topbar" style={{ backgroundColor: accentColor1 }}></div>
            <div className="interest-check-nav">
                <span onClick={back}>
                    <Plus rotation={45} size={24} />
                </span>
            </div>
            <div className="interest-check-container container">{props.children}</div>
            {/* <div className="interest-check-bottombar"></div> */}
            <Footer />
        </div>
    );
}

export default InterestCheckLayout;
