import React, { useContext } from 'react';
import Button from '../Button';
import useStore from '../../context';
import { AVAILABILITY_FILTER } from '../../constants';

interface TabProps {
    id: String;
    type: 'cap' | 'availability';
    label: string;
}

function Tab(props: TabProps): JSX.Element {
    const { id, type, label } = props;
    const filters = useStore<any>((state) => state.filters);
    const setFilters = useStore<any>((state) => state.setFilters);

    function handleUpdateFilters(): void {
        setFilters({
            ...filters,
            [type]: id === filters[type] ? 'none' : id,
        });
    }

    const isActive = id === filters[type];
    return (
        <Button onClick={handleUpdateFilters} variant="tab" size="sm" className={`${isActive ? 'active' : ''}`}>
            {label}
        </Button>
    );
}

export default Tab;
