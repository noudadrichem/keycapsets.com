import React from 'react';
import Tab from './Tab'

interface TabsProps {

}

const tabs = ['all', 'gmk', 'e-bpt', 'xda', 'sa']

function Tabs(props: TabsProps): JSX.Element {
    const { } = props;

    return (
        <div className="tabs">
            <h5>Choose your keycap type</h5>
            <ul>
                { tabs.map((tab: String, idx: number) => <Tab id={tab} key={idx} />) }
            </ul>
        </div>
    )
}

export default Tabs;
