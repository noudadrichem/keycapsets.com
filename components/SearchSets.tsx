import React, { useEffect, useContext } from 'react';
import useInput from '../hooks/useInput';
import Context from '../context';
import { FETCH_KEYCAPSET_QUERY } from '../queries';
import { useLazyQuery } from '@apollo/react-hooks';

function SearchSets() {
    const [searchValue, searchInput] = useInput({});
    const { setGlobalState } = useContext(Context);

    // const [loadSets, { called, loading, data }] = useLazyQuery(FETCH_KEYCAPSET_QUERY, {
    //     variables: {
    //         query: searchQuery
    //     }
    // })

    // useEffect(() => {
    //     console.log('called...', called, loading, data)

    //     if (called && data !== undefined) {
    //         setGlobalState({
    //             keycapsets: data.keycapsets
    //         })
    //     }
    // }, [called, loading, data])

    useEffect(() => {
        console.log('changed searchset input value..')
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
