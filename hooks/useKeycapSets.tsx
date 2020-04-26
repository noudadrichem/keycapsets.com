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
    const [offset, setOffset] = useState(0);
    const [keycapsets, setKeycapsets] = useState<Keycapset[]>([]);
    const [fetchingMore, setFetchingMore] = useState(false);

    const { data, loading, error } = useQuery(FETCH_KEYCAPSET_QUERY, {
        client,
        variables: {
            ...queryFilters,
            offset,
        },
    });

    useEffect(() => {
        if (data) {
            if (fetchingMore) {
                setKeycapsets([...keycapsets, ...data.keycapsets]);
                setFetchingMore(false);
                setOffset(0);
            } else {
                setKeycapsets(data.keycapsets);
            }
        }
    }, [data]);

    let allKeycapsetsCount = 0;
    if (data) {
        allKeycapsetsCount = data.allKeycapsetsCount;
    }

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
