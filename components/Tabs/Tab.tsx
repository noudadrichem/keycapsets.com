import React, { useContext } from 'react';
import Button from '../Button';
import Context from '../../context';
import { AVAILABILITY_FILTER, CAP_FILTER } from '../../constants';
import Router, { useRouter } from 'next/router';

interface TabProps {
    id: String;
    type: 'cap' | 'availability';
}

function Tab(props: TabProps): JSX.Element {
    const { id, type } = props;
    // const {
    //     setGlobalState,
    //     filters: { activeTab, availability },
    // } = useContext(Context);
    const {
        query: { activeTab, availability },
    } = useRouter();

    function handleUpdateFilters(): void {
        Router.push(`/?availability=${id}`);
        // if (type === 'cap') {
        //     if (isActive) {
        //         setGlobalState({
        //             filters: { availability, activeTab: 'all' },
        //         });
        //     } else {
        //         setGlobalState({
        //             filters: { availability, activeTab: id },
        //         });
        //     }
        // } else if (isActive) {
        //     setGlobalState({
        //         filters: { activeTab, availability: 'none' },
        //     });
        // } else {
        //     setGlobalState({
        //         filters: { activeTab, availability: id },
        //     });
        // }
    }

    const isActive = id === activeTab || id === availability;
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
