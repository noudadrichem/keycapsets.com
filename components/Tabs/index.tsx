import React, { useContext, useEffect } from 'react';

import Tab from './Tab'
import Context from '../../context';
import useInput from '../../hooks/useInput';

interface TabsProps {}

function Tabs(props: TabsProps): JSX.Element {
    const { } = props;

    return (
        <Context.Consumer>
            {
                (state) => {
                    return (
                        <div className="filters">
                            <div className="tabs">
                                <label className="label">Choose your keycap type</label>
                                <ul>
                                    {state.tabs.map((tab: String, idx: number) => <Tab id={tab} key={idx} />)}
                                </ul>
                            </div>
                        </div>
                    )
                }
            }
        </Context.Consumer>
    )
}

export default Tabs;
