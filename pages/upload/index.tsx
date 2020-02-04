import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import '../../assets/styles/main.scss';
import '../../assets/styles/upload.scss';

import withData from '../../hooks/withData';
import Heading from '../../components/Heading';

interface UploadProps {}

function Upload(props: UploadProps) {
    return (
        <div className="container upload">

            <Heading mainTitle="Upload a set or apply as a vendor!" subTitle="Start shining out there!" left />


            <div className="cards">
                <div className="card">
                    <Link  href="/upload/set">Add a set!</Link>
                </div>

                <div className="card">
                    <Link  href="/upload/vendor">Are you a vendor?</Link>
                </div>

            </div>

        </div>
    )
}

export default withData(Upload);
