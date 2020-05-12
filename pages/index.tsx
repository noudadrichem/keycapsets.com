import { ApolloClient } from 'apollo-boost';
import withGA from 'next-ga';
import { Router } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Context } from 'typings';

import '../assets/styles/main.scss';

import { context } from '../context';
import { useKeycapSets } from '../hooks/useKeycapSets';
import withData from '../hooks/withData';

import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';
import Heading from '../components/Heading';
import Images from '../components/Images';
import LoadingKeyboardIllustration from '../components/LoadingKeyboardIllustration';
import Meta from '../components/Meta';
import Nav from '../components/Nav';
import Tabs from '../components/Filters';
import CTACard from '../components/CTACard';

interface HomeProps {
    url: any;
    apollo: ApolloClient<any>;
    metaImg: string;
}

const LIMIT = 24;
function Home(props: HomeProps) {
    const isBrowser = typeof window !== `undefined`;
    const [loadingExtra, setLoadingExtra] = useState<boolean>(true);
    const [isAtBottomOfPage, setIsAtBottomOfPage] = useState(false);
    const { state } = useContext<Context>(context);
    const queryFilters = useMemo(
        () => ({
            limit: LIMIT,
            filter: {
                brand: state.filters.brandFilter || [],
                availability: state.filters.availabilityFilter === 'none' ? '' : state.filters.availabilityFilter,
                material: state.filters.materialFilter || [],
                type: state.filters.profileFilter,
                name: state.searchQuery,
            },
        }),
        [
            state.searchQuery,
            state.filters.availabilityFilter,
            state.filters.brandFilter,
            state.filters.materialFilter,
            state.filters.profileFilter,
        ]
    );
    const {
        keycapsets,
        allKeycapsetsCount,
        loading: keycapsetsLoading,
        error,
        fetchMore: fetchMoreKeycapSets,
    } = useKeycapSets(queryFilters);

    const initLoading = keycapsetsLoading && keycapsets.length < 1;

    // Update filters only when state changes
    const queryFilters = useMemo(
        () => ({
            limit: LIMIT,
            filter: {
                brand: state.filters.brandFilter || [],
                availability: state.filters.availabilityFilter === 'none' ? '' : state.filters.availabilityFilter,
                material: state.filters.materialFilter || [],
                type: state.filters.profileFilter,
                name: state.searchQuery,
            },
        }),
        [
            state.searchQuery,
            state.filters.availabilityFilter,
            state.filters.brandFilter,
            state.filters.materialFilter,
            state.filters.profileFilter,
        ]
    );

    const {
        keycapsets,
        allKeycapsetsCount,
        loading: keycapsetsLoading,
        error,
        fetchMore: fetchMoreKeycapSets,
    } = useKeycapSets(queryFilters);

    const initLoading = keycapsetsLoading && keycapsets.length < 1;

    useEffect(function initializeView() {
        if (isBrowser) {
            window.addEventListener('scroll', checkIsBottomPage);
            return () => window.removeEventListener('scroll', checkIsBottomPage);
        }
    }, []);

    useEffect(() => {
        dispatch({
            type: 'set',
            payload: { allKeycapsetsCount },
        });
    }, [allKeycapsetsCount]);

    useEffect(() => {
        dispatch({
            type: 'set',
            payload: {
                fetchedKeycapsetsLength: keycapsets.length,
            },
        });
    }, [keycapsets]);

    useEffect(
        function handleRefetchingOnBottomOfPage() {
            const isEndReached = keycapsets.length === allKeycapsetsCount;

            if (isEndReached) {
                setLoadingExtra(false);
                return;
            }
            if (isAtBottomOfPage) {
                setLoadingExtra(true);
                fetchMoreKeycapSets();
                setIsAtBottomOfPage(false);
                return;
            }
        },
        [isAtBottomOfPage]
    );

    function checkIsBottomPage() {
        const DELIMITER: number = 5;
        const currentY: number = window.scrollY;
        const docHeight: number = document.body.clientHeight;
        const alreadyScrolled = currentY + window.innerHeight;
        const atBottom: boolean = alreadyScrolled > docHeight - DELIMITER;
        setIsAtBottomOfPage(atBottom);
    }

    return (
        <>
            <Meta metaImgUrl={props.metaImg} />
            <Nav isLargeContainer />
            <div className="container large">
                <Heading mainTitle="Find your favorite keycapset!" subTitle="keycapsets.com" isHome />
                <Tabs />
                {initLoading ? <LoadingKeyboardIllustration /> : <Images keycapsets={keycapsets} />}
                {loadingExtra && <LoadingKeyboardIllustration scale={0.3} />}
                <BackToTop />
            </div>
            <Footer />
            <CTACard />
        </>
    );
}

export default withGA('UA-115865530-2', Router)(withData(Home));
