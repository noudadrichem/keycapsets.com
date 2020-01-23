import React from 'react';
import Tabs from './Tabs';
import Context from '../context';

interface HeadingProps {

}

function Heading(props: HeadingProps): JSX.Element {
    const {} = props;

    return (
        <header className="heading">
            <h1 className="center no-bold">keycapsets.com</h1>
            <h4 className="center italic">Make your keycap wishes come true</h4>

            <Tabs />
        </header>
    )
}

export default Heading;
