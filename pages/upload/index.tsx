import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import '../../assets/styles/main.scss';

import withData from '../../hooks/withData';

interface HomeProps { }

function Home(props: HomeProps) {
    return (
        <>
            <Link href="/upload/set">Set</Link> <br /><br />
            <Link href="/upload/vendor">Vendor</Link>
        </>
    )
}

export default withData(Home);
