import React from 'react';
import Tab from './tab'

interface TabsProps {

}

const tabs = ['all', 'gmk', 'e-bpt', 'xda']

function Tabs(props: TabsProps): JSX.Element {
    const { } = props;

    return (
        <div className="tabs">
            <h5>Choose your keycap type</h5>
            <ul>
                { tabs.map((tab: String) => <Tab id={tab} />) }
            </ul>
        </div>
    )
}

export default Tabs;
