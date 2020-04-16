import React, { useEffect } from 'react';
import Link from 'next/link';
import withGA from 'next-ga';
import Router from 'next/router';

import '../../assets/styles/main.scss';
import '../../assets/styles/upload.scss';

import withData from '../../hooks/withData';
import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

interface UploadProps {}

function Upload(props: UploadProps) {
    useEffect(() => {
        Router.push('/');
    });

    return null;
    <>
        <Nav />
        <div className="container upload">
            <Heading mainTitle="Upload a set or apply as a vendor!" subTitle="Start shining out there!" left />

            <div className="cards">
                <div className="card">
                    <Link href="/upload/set">Add a set!</Link>
                </div>

                <div className="card">
                    <Link href="/upload/vendor">Are you a vendor?</Link>
                </div>
            </div>
        </div>

        <Footer />
    </>;
}

export default withGA('UA-115865530-2', Router)(withData(Upload));
