import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function PoseidonLayout(props: any) {
    return (
        <div id="layout" className="poseidon">
            <Nav smallPadding />
            {props.children}
            <Footer noSponsor />
        </div>
    );
}

export default PoseidonLayout;
