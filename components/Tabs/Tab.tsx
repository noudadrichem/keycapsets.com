import React from 'react';
import Button from '../Button'

interface TabProps {
    id: String;
}

function Tab(props: TabProps): JSX.Element {
    const { id } = props;

    return (
        <li className="tab">
            <Button variant="primary" size="sm" className={id === 'gmk' ? 'primary' : 'inverted'}>
                {id}
            </Button>
        </li>
    )
}

export default Tab;
