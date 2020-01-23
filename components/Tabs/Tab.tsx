import React from 'react';
import Button from '../Button';
import Context from '../../context';

interface TabProps {
    id: String;
}

function Tab(props: TabProps): JSX.Element {
    const { id } = props;

    return (
        <Context.Consumer>
            {
                (state: any) => (
                    <li className="tab">
                        <Button
                            onClick={() => state.setGlobalState({ activeTab: id })}
                            variant="primary"
                            size="sm"
                            className={id === state.activeTab ? 'primary' : 'inverted'
                        }>
                            {id}
                        </Button>
                    </li>
                )
            }
        </Context.Consumer>
    )
}

export default Tab;
