import React, { useEffect, useState } from 'react';
import Error from 'next/error'
import Head from 'next/head';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';
import { InititalState, Keycapset } from 'typings';
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
    const isBrowser = typeof window !== `undefined`
    const client = useApolloClient();

    const [state, setState] = useState<InititalState>(INITITAL_STATE);
    const [limit, setLimit] = useState<number>(LIMIT);
    const [offset, setOffset] = useState<number>(LIMIT);
    const [loadingExtra, setLoadingExtra] = useState<boolean>(true);
    const [isAtBottomOfPage, setIsAtBottomOfPage] = useState(false);

    useEffect(function initializeView() {
        if (isBrowser) {
            window.addEventListener('scroll', checkIsBottomPage)
            initSets()

            return () => window.removeEventListener('scroll', checkIsBottomPage)
        }
    }, [])

    useEffect(function handleTabChange() {
        setLimit(LIMIT);
        setOffset(LIMIT);
        initSets();
    }, [state.activeTab])

    useEffect(function handleRefetchingOnBottomOfPage() {
        const isEndReached = state.keycapsets.length === state.allKeycapsetsCount;
        console.log('isendreached..', isEndReached);

        if (isEndReached) {
            setLoadingExtra(false);
            return;
        }
        if (isAtBottomOfPage) {
            setLoadingExtra(true);
            fetchMoreWhenBottomOfPage();
            setIsAtBottomOfPage(false);
        }
    }, [isAtBottomOfPage])


    useEffect(function handleSearch() {
        let timeout;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if(state.searchQuery !== '') {
                setOffset(0)
                fetchMoreWhenSearched();
            } else {
                initSets();
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [state.searchQuery])

    function checkIsBottomPage() {
        const DELIMITER = 5;
        const currentY = window.scrollY;
        const docHeight = document.body.clientHeight;
        const alreadyScrolled = currentY + window.innerHeight;
        const atBottom = alreadyScrolled > (docHeight - DELIMITER);
        setIsAtBottomOfPage(atBottom);
    }

    async function fetchMoreWhenSearched(): Promise<void> {
        const { data } = await fetchMoreSets(0, 100);
        const { keycapsets } = data;

        setGlobalState({
            keycapsets
        })
    }

    async function fetchMoreWhenBottomOfPage(): Promise<void> {
        if (state.searchQuery === '') {
            setLimit(limit + LIMIT);
            setOffset(limit + LIMIT);

            const { data } = await fetchMoreSets(offset);
            const { keycapsets } = data;

            if (keycapsets.length > 0) {
                if (state.searchQuery === '') {
                    setGlobalState({
                        keycapsets: [
                            ...state.keycapsets,
                            ...keycapsets
                        ]
                    })
                } else {
                    setGlobalState({
                        keycapsets
                    })
                }
            } else {
                window.removeEventListener('scroll', checkIsBottomPage)
            }
        }
    }

    async function fetchMoreSets(offset: number, limit?: number): Promise<any> {
        console.log('fetch more sets...')
        const fetchSetQueryResult = await client.query({
            query: FETCH_KEYCAPSET_QUERY,
            variables: {
                offset,
                limit: limit ? limit : LIMIT,
                type: state.activeTab,
                query: state.searchQuery
            }
        });
        return fetchSetQueryResult;
    }

    async function initSets() {
        console.log('init sets...')
        const { data } = await fetchMoreSets(0);
        const { keycapsets, allKeycapsetsCount } = data;
        setGlobalState({
            allKeycapsetsCount,
            keycapsets,
            tabs: ['all', 'gmk', 'pbt', 'sa', 'dsa', 'kat', 'jtk', 'kam']
        })
    }

    function setGlobalState(obj: any) {
        setState(reduceState(state, obj))
    }

    return (
        <Context.Provider value={{ ...state, setGlobalState }}>
            <Meta />

            <Head>
                <meta property="og:image" content={props.metaImg} />
            </Head>

            <Nav isLargeContainer />
            <div className="container large">
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
