import React, { useContext, useEffect } from 'react';

import '../assets/styles/interestcheck.scss';
import Footer from '../components/Footer';
import useInterestCheckStore from '../hooks/useInterestCheckStore';

interface InterestCheckLayoutProps {
    children: any;
}

function InterestCheckLayout(props: InterestCheckLayoutProps) {
    const accentColor1 = useInterestCheckStore<any>((state) => state.keycapset?.accentColor1);

    return (
        <div className="interest-check">
            <div className="interest-check-topbar" style={{ backgroundColor: accentColor1 }}></div>
            <div className="interest-check-container container">{props.children}</div>
            {/* <div className="interest-check-bottombar"></div> */}
            <Footer />
        </div>
    );
}

export default InterestCheckLayout;
