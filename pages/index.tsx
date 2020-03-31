import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useApolloClient } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';
import { InititalState, Keycapset } from 'typings';
import withGA from "next-ga";
import { forceCheck } from 'react-lazyload';

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
    const LIMIT = 96;
    const isBrowser = typeof window !== `undefined`
    const client = useApolloClient();

    const [state, setState] = useState<InititalState>(INITITAL_STATE);
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
        fetchMoreWhenSearched()
    }, [state.activeTab])

    useEffect(function handleRefetchingOnBottomOfPage() {
        const isEndReached = state.keycapsets.length === state.allKeycapsetsCount;

        if (isEndReached) {
            setLoadingExtra(false);
            return;
        }
        if (isAtBottomOfPage) {
            setLoadingExtra(true);
            fetchMoreWhenBottomOfPage();
            setIsAtBottomOfPage(false);
            return;
        }
    }, [isAtBottomOfPage])


    useEffect(function handleSearch() {
        let timeout: any;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if(state.searchQuery !== '' || state.searchQuery !== undefined) {
                fetchMoreWhenSearched();
                forceCheck();
            } else {
                initSets();
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [state.searchQuery])

    function checkIsBottomPage() {
        const DELIMITER: number = 5;
        const currentY: number = window.scrollY;
        const docHeight: number = document.body.clientHeight;
        const alreadyScrolled = currentY + window.innerHeight;
        const atBottom: boolean = alreadyScrolled > (docHeight - DELIMITER);
        setIsAtBottomOfPage(atBottom);
    }

    async function fetchMoreWhenSearched(): Promise<void> {
        const offsetFetch: number = 0;
        const { data } = await fetchMoreSets(offsetFetch, LIMIT);
        const { keycapsets, allKeycapsetsCount } = data;

        setGlobalState({
            keycapsets,
            allKeycapsetsCount
        })
        setInitLoading(false)
    }

    async function fetchMoreWhenBottomOfPage(): Promise<void> {
        if (state.searchQuery === '' || state.searchQuery === undefined) {
            const offsetFetch: number = state.keycapsets.length;
            const { data } = await fetchMoreSets(offsetFetch, LIMIT);
            const { keycapsets } = data;

            if (keycapsets.length > 1) {
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

    async function initSets() {
        const { data } = await fetchMoreSets(0, LIMIT);
        const { keycapsets, allKeycapsetsCount } = data;

        setGlobalState({
            allKeycapsetsCount,
            keycapsets,
        })
    }

    async function fetchMoreSets(offset: number, limit?: number): Promise<any> {
        const fetchSetQueryResult = await client.query({
            query: FETCH_KEYCAPSET_QUERY,
            variables: {
                offset,
                limit: limit,
                type: state.activeTab,
                query: state.searchQuery
            }
        });
        return fetchSetQueryResult;
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
