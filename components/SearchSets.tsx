import React, { useEffect, useContext, useCallback } from 'react';
import useInput from '../hooks/useInput';
import context from '../context';
import { useRouter, NextRouter } from 'next/router';
import { Context } from 'typings';

function SearchSets() {
    const router: NextRouter = useRouter();
    const [searchValue, searchInput, setSearchInputValue] = useInput({
        placeholder: 'E.g. Space cadet',
        autoFocus: false,
    });
    // const { state, dispatch } = useContext<Context>(context);

    // TODO: this supported the use of search?= query in URL...
    useEffect(() => {
        const searchQuery = router.query.search;
        if (searchQuery !== undefined) {
            setSearchInputValue(searchQuery);
            // dispatch({
            //     type: 'set',
            //     payload: { searchQuery: searchValue },
            // });
        }
    }, [router.query.search]);

    useEffect(() => {
        let timeout: any;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if (searchValue !== '' || searchValue !== undefined) {
                // dispatch({
                //     type: 'set',
                //     payload: { searchQuery: searchValue },
                // });
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchValue]);

    return <div className="search-input">{searchInput}</div>;
}

export default SearchSets;
