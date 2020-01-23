import React, { useEffect, useState } from 'react';
import '../assets/styles/main.scss';

import Context, { INITITAL_STATE, reduceState } from '../context';

import Heading from '../components/Heading';

interface HomeProps {

}

function Home(props: HomeProps) {
    const [state, setState] = useState(INITITAL_STATE);

    function setGlobalState(obj) {
        setState(reduceState(state, obj,))
    }

    useEffect(() => {}, []);

    return (
        <Context.Provider value={{ ...state, setGlobalState }}>
            <div id="home">
                <Heading />
            </div>
        </Context.Provider>
    )
}

export default Home;
