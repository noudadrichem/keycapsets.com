import React, { useContext } from 'react';
import Button from '../Button';
import useStore from '../../context';
import { AVAILABILITY_FILTER } from '../../constants';

interface TabProps {
    id: string;
    type: 'cap' | 'availability';
    label: string;
    handleUpdateFilters(availability: string);
}

function Tab(props: TabProps): JSX.Element {
    const { id, type, label, handleUpdateFilters } = props;
    const filters = useStore((state) => state.filters);

    console.log('id', id, filters);
    const isActive = id === filters[type];
    return (
        <Button onClick={handleUpdateFilters} variant="tab" size="sm" className={`${isActive ? 'active' : ''}`}>
            {label}
        </Button>
    );
}

export default Tab;
