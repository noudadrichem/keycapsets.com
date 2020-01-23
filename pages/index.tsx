import React, { useEffect } from 'react';
import '../assets/styles/main.scss';

import Heading from '../components/Heading';

interface HomeProps {

}

function Home(props: HomeProps) {

    useEffect(() => {

    }, []);

    return (
        <div id="home">
            <Heading />
        </div>
    )
}

export default Home;
