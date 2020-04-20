import React, { useContext } from 'react';
import Context from '../../context';
import Button from '../Button';

interface TabProps {
    id: String;
    type: 'cap' | 'availability';
}

const stateFilterKeys = {
    cap: 'activeTab',
    availability: 'availabilityFilter',
};

function Tab(props: TabProps): JSX.Element {
    const { id, type } = props;
    const { setGlobalState, filters } = useContext(Context);
    const typeKey = stateFilterKeys[type];

    function handleUpdateFilters(): void {
        setGlobalState({
            filters: { ...filters, [typeKey]: id === filters[typeKey] ? 'none' : id },
        });
    }

    const isActive = id === filters[typeKey];
    return (
        <Button
            onClick={() => handleUpdateFilters()}
            variant="primary"
            size="sm"
            className={isActive ? 'primary' : 'inverted'}
        >
            {id}
        </Button>
    );
}

export default Tab;
