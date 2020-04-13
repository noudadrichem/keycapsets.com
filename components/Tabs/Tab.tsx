import React, { useContext } from 'react';
import Button from '../Button';
import Context from '../../context';

interface TabProps {
    id: String;
    type: 'cap' | 'availability';
}

function Tab(props: TabProps): JSX.Element {
    const { id, type } = props;
    const { setGlobalState, filters: {
            activeTab, availabilityFilter
            }
        } = useContext(Context);
    const handleUpdateFilters = (): void => {
        type === "cap"
            ? isActive
                ? setGlobalState({ filters:{availabilityFilter, activeTab: 'all'} })
                : setGlobalState({ filters:{availabilityFilter, activeTab: id} })
            : isActive
            ? setGlobalState({
                  filters:{ activeTab ,availabilityFilter: 'none'},
              })
            : setGlobalState({
                  filters:{ activeTab, availabilityFilter: id},
              })
    }
    const isActive = id === activeTab || id === availabilityFilter;
    return (
        <li className="tab">
            <Button
                onClick={() => handleUpdateFilters()}
                variant="primary"
                size="sm"
                className={isActive ? 'primary' : 'inverted'}
            >
                {id}
            </Button>
        </li>
    );
}

export default Tab;
