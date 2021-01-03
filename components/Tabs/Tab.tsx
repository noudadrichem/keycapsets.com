import React, { useContext } from 'react';
import Button from '../Button';

interface TabProps {
    id: string;
    type: 'cap' | 'availability' | string;
    label: string;
    onClick();
    isActive?: boolean;
}

function Tab(props: TabProps): JSX.Element {
    const { id, type, label, onClick, isActive } = props;
    return (
        <Button onClick={onClick} variant="tab" size="sm" className={`${isActive ? 'active' : ''}`}>
            {label}
        </Button>
    );
}

export default Tab;
