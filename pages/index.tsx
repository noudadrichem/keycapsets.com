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

interface HomeProps {}

function Home(props: HomeProps) {
    const [state, setState] = useState(INITITAL_STATE);
    const { loading, error, data } = useQuery(FETCH_KEYCAPSET_QUERY);

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
        setGlobalState({
            keycapsets: data.keycapsets,
            tabs: getTabs()
        })
    }, []);

    if(loading) {
        return 'loading...'
    }

    if(error) {
        return 'error...'
    }

    return (
        <Context.Provider value={{ ...state, setGlobalState }}>
            <Nav />
            <div className="container">
                <Heading
                    mainTitle="keycapsets.com"
                    subTitle="Find your favorite sets!"
                    isHome
                />
                <Images />
                <Footer />
            </div>
        </Context.Provider>
    )
}

export default withData(Home);
