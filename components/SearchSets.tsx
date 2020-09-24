import React, { useEffect, useContext, useCallback } from 'react';
import useInput from '../hooks/useInput';
// import context from '../context';
import { useRouter, NextRouter } from 'next/router';
import { Context } from '../types/interfaces';
import useStore from '../context';

function SearchSets() {
    const router: NextRouter = useRouter();
    const [searchValue, searchInput, setSearchInputValue] = useInput({
        placeholder: 'E.g. Space cadet',
        autoFocus: false,
    });
    const filters = useStore((state) => state.filters);
    const setFilters = useStore((state) => state.setFilters);

    // TODO: this supported the use of search?= query in URL...
    useEffect(() => {
        const searchQuery = router.query.search;
        if (searchQuery !== undefined) {
            // @ts-expect-error
            setSearchInputValue(searchQuery);
            setFilters({
                ...filters,
                name: Array.isArray(searchQuery) ? searchQuery[0] : searchQuery,
            });
        }
    }, [router.query.search]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if (searchValue !== '' || searchValue !== undefined) {
                setFilters({
                    ...filters,
                    // @ts-expect-error
                    name: searchValue,
                });
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchValue]);

    return <div className="search-input">{searchInput}</div>;
}

export default SearchSets;
