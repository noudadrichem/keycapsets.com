import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { FETCH_KEYCAPSET_QUERY } from '../queries';
import { useState, useEffect } from 'react';
import { Keycapset } from 'typings';

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
    const [allKeycapsetsCount, setKeycapsetCount] = useState<number>(0);


    const { data, loading, error } = useQuery(FETCH_KEYCAPSET_QUERY, {
        client,
        variables: {
            ...queryFilters,
            offset,
        },
    });

    useEffect(() => {
        if (data) {
            setKeycapsetCount(data.allKeycapsetsCount);
            if (fetchingMore) {
                setKeycapsets([...keycapsets, ...data.keycapsets]);
            } else {
                setKeycapsets(data.keycapsets);
            }
        }

        if (fetchingMore) {
            setFetchingMore(false);
        }
    }, [data]);

    useEffect(() => {
        if (queryFilters) {
            setOffset(0);
            setFetchingMore(false);
        }
    }, [queryFilters.limit, queryFilters.filter]);

    function fetchMore() {
        setFetchingMore(true);
        setOffset(keycapsets.length);
    }

    return {
        keycapsets,
        allKeycapsetsCount,
        loading,
        error,
        fetchMore,
    };
}
