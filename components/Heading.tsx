import React from 'react';
import Tabs from './Tabs';
import Context from '../context';

interface HeadingProps {
    mainTitle: string;
    subTitle: string;
    isHome?: boolean;
}

function Heading(props: HeadingProps): JSX.Element {
    const { mainTitle, subTitle, isHome } = props;

    return (
        <header className="heading">
            <h1 className="center no-bold">{ mainTitle  }</h1>
            <h4 className="center italic">{ subTitle }</h4>

            {isHome && <Tabs />}
        </header>
    )
}

export default Heading;
