import React, { useEffect, useState } from 'react';
import { Keycapset } from '../types/types';

import { useQuery, NetworkStatus } from '@apollo/client';
import { FETCH_KEYCAPSET_QUERY, USER_WANTS_SETS } from '../queries';
import LoadingKeyboardIllustration from './LoadingKeyboardIllustration';
import Cards from './Cards';
import useStore from '../context';

export default function Overview(props: any): JSX.Element {
    const [atBottom, setIsAtBottom] = useState<boolean>(false);
    const filters = useStore((state) => state.filters);

    const { data, networkStatus, loading, fetchMore } = useQuery(FETCH_KEYCAPSET_QUERY, {
        variables: {
            filter: filters,
            limit: 12,
            offset: 0,
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network',
    });

    useEffect(function initializeView() {
        const isBrowser = typeof window !== `undefined`;
        if (isBrowser) {
            window.addEventListener('scroll', checkIsBottomPage);
            return () => window.removeEventListener('scroll', checkIsBottomPage);
        }
    }, []);

    useEffect(
        function handleLoadMore() {
            if (atBottom) {
                if (!loading) {
                    loadMore(data.keycapsets.length || 0);
                }
            }
        },
        [atBottom]
    );

    function checkIsBottomPage() {
        const DELIMITER: number = 132;
        const currentY: number = window.scrollY;
        const docHeight: number = document.body.clientHeight;
        const alreadyScrolled = currentY + window.innerHeight;
        const isAtBottom: boolean = alreadyScrolled > docHeight - DELIMITER;
        setIsAtBottom(isAtBottom);
    }

    function loadMore(offset: number) {
        setIsAtBottom(false);
        return fetchMore({
            variables: {
                limit: 12,
                offset,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult && !fetchMoreResult.keycapsets) return prev;
                return Object.assign({}, prev, {
                    keycapsets: [...prev.keycapsets, ...fetchMoreResult.keycapsets],
                });
            },
        });
    }

    return (
        <div className="overview">
            {data && <Cards keycapsets={data.keycapsets} />}
            {networkStatus === NetworkStatus.fetchMore && <LoadingKeyboardIllustration scale={0.4} />}
        </div>
    );
}
