import React from 'react';
import Tab from './Tab'
import Context from '../../context';

interface TabsProps {}

function Tabs(props: TabsProps): JSX.Element {
    const { } = props;

    return (
        <Context.Consumer>
            {
                (state) => (
                    <div className="tabs">
                        <h5>Choose your keycap type</h5>
                        <ul>
                            { state.tabs.map((tab: String, idx: number) => <Tab id={tab} key={idx} />) }
                        </ul>
                    </div>
                )
            }
        </Context.Consumer>
    )
}

export default Tabs;
