import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function PoseidonLayout(props: any) {
    return (
        <div id="layout poseidon">
            <Nav />

            <h1>poseidon</h1>
            {props.children}

            <Footer noSponsor />
        </div>
    );
}

export default PoseidonLayout;
