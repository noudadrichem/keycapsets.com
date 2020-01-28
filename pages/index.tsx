import React, { useEffect, useState } from 'react';
import Context, { INITITAL_STATE, reduceState } from '../context';
import { ApolloProvider } from '@apollo/react-hooks';

import Heading from '../components/Heading';
import Images from '../components/Images';
import withData from '../hooks/withData';

import '../assets/styles/main.scss';

interface HomeProps {}

function Home(props: HomeProps) {
    console.log('hone props..', props)

    const [state, setState] = useState(INITITAL_STATE);

    function setGlobalState(obj) { setState(reduceState(state, obj))}

    useEffect(() => {}, []);

    return (
        <Context.Provider value={{ ...state, setGlobalState }}>

                <Heading
                    mainTitle="keycapsets.com"
                    subTitle="Make your keycap wishes come true"
                    isHome
                />
                <Images />

        </Context.Provider>
    )
}

export default withData(Home);
