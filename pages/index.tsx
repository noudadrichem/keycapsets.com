import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useApolloClient } from '@apollo/react-hooks';
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
import LoadingKeyboardIllustration from '../components/LoadingKeyboardIllustration';
import CTACard from '../components/CTACard';
import BackToTop from '../components/BackToTop';

import '../assets/styles/main.scss';
import Meta from '../components/Meta';
import { Router } from 'next/router';

interface HomeProps {
    url: any;
    apollo: ApolloClient<any>;
    metaImg: string;
}

function Home(props: HomeProps) {
    const LIMIT = 100;
    const isBrowser = typeof window !== `undefined`
    const client = useApolloClient();

    const [state, setState] = useState<InititalState>(INITITAL_STATE);
    const [limit, setLimit] = useState<number>(LIMIT);
    const [offset, setOffset] = useState<number>(LIMIT);
    const [initLoading , setInitLoading] = useState<boolean>(true);
    const [loadingExtra, setLoadingExtra] = useState<boolean>(true);
    const [isAtBottomOfPage, setIsAtBottomOfPage] = useState(false);

    useEffect(function initializeView() {
        if (isBrowser) {
            window.addEventListener('scroll', checkIsBottomPage)
            return () => window.removeEventListener('scroll', checkIsBottomPage);
        }
    }, [])

    useEffect(function handleTabChange() {
        setLimit(LIMIT);
        setOffset(LIMIT);
        // initSets();
    }, [state.activeTab])

    useEffect(function handleRefetchingOnBottomOfPage() {
        const isEndReached = state.keycapsets.length === state.allKeycapsetsCount;

        if (isEndReached) {
            setLoadingExtra(false);
            return;
        }
        if (isAtBottomOfPage) {
            console.log('is at bottom')
            setLoadingExtra(true);
            fetchMoreWhenBottomOfPage();
            setIsAtBottomOfPage(false);
            return;
        }
    }, [isAtBottomOfPage])


    useEffect(function handleSearch() {
        console.log('handle search...', state.searchQuery);
        let timeout;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if(state.searchQuery !== '' || state.searchQuery !== undefined) {
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
        console.log('fetch more when searched')
        const { data } = await fetchMoreSets(0, 100);
        const { keycapsets, allKeycapsetsCount } = data;

        setGlobalState({
            keycapsets,
            allKeycapsetsCount
        })
        setInitLoading(false)
    }

    async function fetchMoreWhenBottomOfPage(): Promise<void> {
        console.log('fetch more when at bottom')
        if (state.searchQuery === '' || state.searchQuery === undefined) {
            console.log('empty search query')
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
        console.log('inti sets')
        const { data } = await fetchMoreSets(0);
        const { keycapsets, allKeycapsetsCount } = data;

        setGlobalState({
            allKeycapsetsCount,
            keycapsets,
        })
    }

    function setGlobalState(obj: any) {
        setState(reduceState(state, obj))
    }

    return (
        <Context.Provider value={{ ...state, setGlobalState }}>
            <Meta metaImgUrl={props.metaImg} />

            <Nav isLargeContainer />
            <div className="container large">
                <Heading
                    mainTitle="Find your favorite keycapset!"
                    subTitle="keycapsets.com"
                    isHome
                />

                {
                    initLoading
                    ? <LoadingKeyboardIllustration />
                    : <Images />
                }

                { loadingExtra && <LoadingKeyboardIllustration scale={0.3} />}

                <BackToTop />
                <Footer />
            </div>

            <CTACard />
        </Context.Provider>
    )
}

export default withGA('UA-115865530-2', Router)(withData(Home));
