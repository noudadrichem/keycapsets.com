import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import withData from '../hooks/withData';
import Context, { INITITAL_STATE, reduceState } from '../context';
import { FETCH_KEYCAPSET_QUERY } from '../queries'

import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Images from '../components/Images';
import Nav from '../components/Nav';


import '../assets/styles/main.scss';
import Head from 'next/head';
import LoadingKeyboard from '../components/LoadingKeyboard';
import useWindowScroll from '../hooks/useWindowScroll';

interface HomeProps {}

function Home(props: HomeProps) {
    const [state, setState] = useState(INITITAL_STATE);
    const { loading, error, data } = useQuery(FETCH_KEYCAPSET_QUERY);
    const { x, y } = useWindowScroll();

    function setGlobalState(obj) {
        setState(reduceState(state, obj))
    }

    function getTabs() {
        const allTabs = data.keycapsets.reduce((result: string[], set: any) => {
            if (!result.includes(set.type)) {
                result.push(set.type)
            }
            return result;
        }, ['all'])

        return allTabs;
    }

    useEffect(() => {
        if(!!data) {
            setGlobalState({
                keycapsets: data.keycapsets,
                tabs: getTabs()
            })
        }
    }, [data]);

    if(loading) {
        return <LoadingKeyboard />
    }

    if (error) {
        return <p>'Error loading keycapsets.com... Please refresh this page'</p>;
    }

    const title = `Keycapsets. Find your favorite set!`;
    const description = `Searching for a beautifull keycapset for your keyboard but don't know where to start? This page shows you sets that excist and will point you in the right direction to buy!`;

    return (
        <Context.Provider value={{ ...state, setGlobalState }}>
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    key="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.00, minimum-scale=1.00"
                />
                <meta name="author" content="noudadrichem" />
                <meta property="og:title" content={title}/>
                <meta name="twitter:title" content={title}/>

                <meta name="description" content={description} />
                <meta property="og:description" content={description}/>
                <meta name="twitter:description" content={description}/>
            </Head>
            <Nav />
            <div className="container">
                <Heading
                    mainTitle="keycapsets.com"
                    subTitle="Find your favorite sets!"
                    isHome
                />
                {y}
                <Images />
                <Footer />
            </div>
        </Context.Provider>
    )
}

export default withData(Home);
