import React, { useEffect, useState } from 'react';
import Error from 'next/error'
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';
import { InititalState } from 'typings';
import withGA from "next-ga";

import withData from '../hooks/withData';
import Context, { INITITAL_STATE, reduceState } from '../context';
import { FETCH_KEYCAPSET_QUERY } from '../queries'

import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Images from '../components/Images';
import Nav from '../components/Nav';
import LoadingKeyboard from '../components/LoadingKeyboard';
import LoadingKeyboardIllustration from '../components/LoadingKeyboardIllustration';
import CTACard from '../components/CTACard';

import '../assets/styles/main.scss';
import Meta from '../components/Meta';
import { Router } from 'next/router';

interface HomeProps {
    url: any;
    apollo: ApolloClient<any>;
    metaImg: string;
}

function Home(props: HomeProps) {
    const LIMIT = 9;
    const [state, setState] = useState<InititalState>(INITITAL_STATE);
    const [limit, setLimit] = useState<number>(LIMIT);
    const [offset, setOffset] = useState<number>(LIMIT);
    const [loadingExtra, setLoadingExtra] = useState<boolean>(true);
    const [isAtBottomOfPage, setIsAtBottomOfPage] = useState(false);
    const isBrowser = typeof window !== `undefined`
    const { loading, error, data } = useQuery(FETCH_KEYCAPSET_QUERY, {
        variables: {
            limit: LIMIT,
            type: state.activeTab
        }
    });

    useEffect(() => {
        if (isBrowser) {
            console.log('window innerheight', window.innerHeight)
            window.addEventListener('scroll', checkIsBottomPage)
            return () => window.removeEventListener('scroll', checkIsBottomPage)
        }

    }, [])

    useEffect(() => {
        setLimit(LIMIT);
        setOffset(LIMIT);
    }, [state.activeTab])

    useEffect(() => {
        if (isAtBottomOfPage) {
            fetchMoreWhenBottomOfPage()
        }
        setIsAtBottomOfPage(false);
    }, [isAtBottomOfPage])

    function checkIsBottomPage() {
        const DELIMITER = 5;
        const currentY = window.scrollY;
        const docHeight = document.body.clientHeight;
        const alreadyScrolled = currentY + window.innerHeight;
        const atBottom = alreadyScrolled > (docHeight - DELIMITER);
        setIsAtBottomOfPage(atBottom)
    }

    async function fetchMoreWhenBottomOfPage() {
        setLimit(limit + LIMIT);
        setOffset(limit + LIMIT)
        setLoadingExtra(true)

        const fetchSetQueryResult = await props.apollo.query({
            query: FETCH_KEYCAPSET_QUERY,
            variables: {
                offset,
                limit: LIMIT,
                type: state.activeTab
            }
        });
        const { data: { keycapsets }, loading } = fetchSetQueryResult;

        if(keycapsets.length > 0) {
            setLoadingExtra(loading)
            setGlobalState({ keycapsets: [...state.keycapsets, ...keycapsets]})
        } else {
            setLoadingExtra(false)
            window.removeEventListener('scroll', checkIsBottomPage)
        }
    }

    function setGlobalState(obj: any) {
        setState(reduceState(state, obj))
    }

    useEffect(() => {
        if(!!data) {
            setGlobalState({
                keycapsets: data.keycapsets,
                tabs: ['all', 'gmk', 'pbt', 'kat', 'jtk', 'kam']
            })
        }
    }, [data]);

    if(loading) {
        return <LoadingKeyboard />
    }

    if (error) {
        console.error(error);
        return <Error title="Oops, small mistake here..." statusCode={502} />
    }

    return (
        <Context.Provider value={{ ...state, setGlobalState }}>
            <Meta />

            <Head>
                <meta property="og:image" content={props.metaImg} />
            </Head>

            <Nav />
            <div className="container">
                <Heading
                    mainTitle="Find your favorite keycapset!"
                    subTitle="keycapsets.com"
                    isHome
                />
                <Images />

                { loadingExtra && <LoadingKeyboardIllustration scale={0.3} />}
                <Footer />
            </div>

            <CTACard />
        </Context.Provider>
    )
}

export default withGA('UA-115865530-2', Router)(withData(Home));
