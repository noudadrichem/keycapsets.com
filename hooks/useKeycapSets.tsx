import { useApolloClient, useQuery } from '@apollo/client';
import { FETCH_KEYCAPSET_QUERY } from '../queries';
import { useState, useEffect } from 'react';
import { Keycapset } from '../types/interfaces';

export interface KeycapSetsFilters {
    limit: number;
    filter: {
        brand: string[];
        type: string[];
        material: string[];
        availability: string;
        name: string;
    };
}

export function useKeycapSets(queryFilters: KeycapSetsFilters) {
    const client = useApolloClient();
    const [offset, setOffset] = useState<number>(0);
    const [keycapsets, setKeycapsets] = useState<Keycapset[]>([]);
    const [fetchingMore, setFetchingMore] = useState<boolean>(false);

    const { data, loading, error, fetchMore } = useQuery(FETCH_KEYCAPSET_QUERY, {
        client,
        variables: {
            ...queryFilters,
            offset,
        },
        fetchPolicy: 'network-only',
    });

    useEffect(
        function handleSetQuery() {
            if (data) {
                console.log(
                    'data...',
                    data.keycapsets.map(({ name }) => name)
                );
                if (fetchingMore) {
                    setKeycapsets([...keycapsets, ...data.keycapsets]);
                } else {
                    setKeycapsets(data.keycapsets);
                }
            }

            if (fetchingMore) {
                setFetchingMore(false);
            }
        },
        [data]
    );

    useEffect(() => {
        if (queryFilters) {
            setOffset(0);
            setFetchingMore(false);
        }
    }, [queryFilters.limit, queryFilters.filter]);

    function more() {
        console.log('fetch moree...', keycapsets.length, offset, keycapsets);
        fetchMore({
            variables: {
                ...queryFilters,
                offset: keycapsets.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                console.log('update query...', { prev, fetchMore });
                if (!fetchMoreResult) return prev;
                setKeycapsets([...prev.keycapsets, ...fetchMoreResult.keycapsets]);
                // return Object.assign({}, prev, {
                //     feed: [...prev.feed, ...fetchMoreResult.feed]
                // });
            },
        });
        // setFetchingMore(true);
        // setOffset(keycapsets.length);
    }

    return {
        keycapsets,
        loading,
        error,
        more,
    };
}
