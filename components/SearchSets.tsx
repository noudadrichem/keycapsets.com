import React, { useEffect } from 'react';
import useInput from '../hooks/useInput';
import { useRouter, NextRouter } from 'next/router';
import useStore from '../context';
import SearchIcon from './SearchIcon';

function SearchSets() {
    const router: NextRouter = useRouter();
    const [searchValue, searchInput, setSearchInputValue] = useInput({
        placeholder: 'E.g. Space cadet',
        autoFocus: true,
        icon: <SearchIcon size={16} color="#bbc0c9" />,
    });
    const filters = useStore((state) => state.filters);
    const setFilters = useStore((state) => state.setFilters);

    // TODO: this supported the use of search?= query in URL...
    useEffect(() => {
        const searchQuery = router.query.search;
        console.log({ searchQuery });
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
