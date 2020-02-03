import React from 'react';
import Tabs from './Tabs';
import Context from '../context';

interface HeadingProps {
    mainTitle: string;
    subTitle: string;
    isHome?: boolean;
    left?: boolean;
}

function Heading(props: HeadingProps): JSX.Element {
    const { mainTitle, subTitle, isHome, left = false } = props;

    return (
        <header className={`heading ${isHome ? 'home' : 'not-home'}`}>
            <h1 className={`no-bold ${left ? 'left' : 'center'}`}>{ mainTitle  }</h1>
            <h4 className={`italic ${left ? 'left' : 'center'}`}>{ subTitle }</h4>

            {isHome && <Tabs />}
        </header>
    )
}

export default Heading;
