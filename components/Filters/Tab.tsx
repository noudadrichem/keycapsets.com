import React, { useContext } from 'react';
import Button from '../Button';
import useStore from '../../context';
import { AVAILABILITY_FILTER } from '../../constants';

interface TabProps {
    id: string;
    type: 'cap' | 'availability' | string;
    label: string;
    onClick();
}

function Tab(props: TabProps): JSX.Element {
    const { id, type, label, onClick } = props;
    const filters = useStore((state) => state.filters);

    const isActive = id === filters[type];
    return (
        <Button onClick={onClick} variant="tab" size="sm" className={`${isActive ? 'active' : ''}`}>
            {label}
        </Button>
    );
}

export default Tab;
