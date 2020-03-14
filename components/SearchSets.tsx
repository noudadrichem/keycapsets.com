import React, { useEffect, useContext } from 'react';
import useInput from '../hooks/useInput';
import Context from '../context';
import { FETCH_KEYCAPSET_QUERY } from '../queries';
import { useLazyQuery } from '@apollo/react-hooks';

function SearchSets() {
    const [searchValue, searchInput] = useInput({});
    const { setGlobalState } = useContext(Context);

    useEffect(() => {
        setGlobalState({
            searchQuery: searchValue,
        });
    }, [searchValue])

    return (
        <div className="search-input">
            {searchInput}
        </div>
    )
}

export default SearchSets;
