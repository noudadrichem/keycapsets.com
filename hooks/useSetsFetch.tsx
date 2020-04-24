import { useState, useEffect } from 'react';
import { FETCH_KEYCAPSET_QUERY } from '../queries';
import { Keycapset } from 'typings';
import { ApolloClient } from 'apollo-boost';

interface fetchProps {
    apolloClient: ApolloClient<any>;
}

const LIMIT = 9;

function useSetsFetch(props: fetchProps) {
    const { apolloClient } = props;
    const [limit, setLimit] = useState<number>(LIMIT);
    const [offset, setOffset] = useState<number>(LIMIT);
    const [type, setType] = useState<string>('all');
    const [query, setQuery] = useState<string>('');
    const [status, setStatus] = useState<string>('loading');
    const [keycapsets, setKeycapsets] = useState<Keycapset[]>([]);

    useEffect(() => {
        async function fetchKeycapsets() {
            const fetchSetQueryResult = apolloClient.query({
                query: FETCH_KEYCAPSET_QUERY,
                variables: {
                    offset,
                    type,
                    query,
                    limit: LIMIT,
                },
            });
            const {
                data: { keycapsets },
                loading,
            } = await fetchSetQueryResult;
            setKeycapsets(keycapsets);

            // if (keycapsets.length > 0) {
            // } else {
            //     setKeycapsets([])
            // setLoadingExtra(false)
            // window.removeEventListener('scroll', checkIsBottomPage)
            // }
        }

        fetchKeycapsets();
    }, [query, type]);

    return {
        keycapsets,
        setLimit,
        setOffset,
        setQuery,
        setType,
    };
}

export default useSetsFetch;
