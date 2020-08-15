import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import withGA from 'next-ga';
import Router, { NextRouter, useRouter } from 'next/router';

import '../assets/styles/main.scss';

import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Meta from '../components/Meta';
import Button from '../components/Button';

interface ErrorProps {
    statusCode?: string;
}

function Error(props: ErrorProps) {
    const { statusCode } = props;
    const title = `Error Keycapsets`;
    const description = `This page doesn't exist...`;
    const [isSearchError, setIsSearchError] = useState<boolean>(false);
    const router: NextRouter = useRouter();

    useEffect(() => {
        if (router.query.set) {
            setIsSearchError(true);
        }
    }, [router.query]);

    function searchByWrongQuery() {
        const reboundUrl = `/?search=${router.query.set}`;
        router.push(reboundUrl);
    }

    return (
        <div className="container error-page">
            {!isSearchError ? (
                <Heading mainTitle={`An error occurred`} subTitle={statusCode} backgroundColor="#f8abab" />
            ) : (
                <div className="rebound-search-error">
                    <h1 className={`title no-bold center`}>There is no set on this page.</h1>
                    <h4 className={`title-sub italic center`}>Would you like to search for {router.query.set}?</h4>
                    <Button variant="primary" size="lg" className="center" onClick={searchByWrongQuery}>
                        Search for {router.query.set} on keycapsets.com
                    </Button>
                </div>
            )}
        </div>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default withGA('UA-115865530-2', Router)(Error);
