import React, { useEffect, useContext } from 'react';
import useInput from '../hooks/useInput';
import Context from '../context';
import { useRouter } from 'next/router';

function SearchSets() {
    const router = useRouter();
    const [searchValue, searchInput, setSearchInputValue] = useInput({ defaultValue: '' });
    const { setGlobalState } = useContext(Context);

    useEffect(() => {
        const searchQuery = router.query.search;
        if (searchQuery !== undefined) {
            setSearchInputValue(searchQuery);
            setGlobalState({ searchQuery });
        }
    }, [router.query.search])

    useEffect(() => {
        setGlobalState({ searchQuery: searchValue });
    }, [searchValue])

    return (
        <div className="search-input">
            {searchInput}
        </div>
    )
}

export default SearchSets;
