import React, { useEffect, useContext } from 'react';
import useInput from '../hooks/useInput';
import Context from '../context';
import { useRouter } from 'next/router';

function SearchSets() {
    const router = useRouter();
    const [searchValue, searchInput, setSearchInputValue] = useInput({
        defaultValue: '',
        placeholder: 'E.g. Carbon',
    });
    const { setGlobalState } = useContext(Context);

    // TODO: this supported the use of search?= query in URL...
    // useEffect(() => {
    //     const searchQuery = router.query.search;
    //     if (searchQuery !== undefined) {
    //         setSearchInputValue(searchQuery);
    //         setGlobalState({ searchQuery });
    //     }
    // }, [router.query.search]);

    useEffect(() => {
        let timeout: any;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if (searchValue !== '' || searchValue !== undefined) {
                setGlobalState({ searchQuery: searchValue });
            }
        }, 200);

        return () => clearTimeout(timeout);
    }, [searchValue]);

    return <div className="search-input">{searchInput}</div>;
}

export default SearchSets;
