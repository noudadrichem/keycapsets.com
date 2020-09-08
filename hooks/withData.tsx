import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

let apolloClient: any;

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('TOKEN');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        },
    };
});

function createApolloClient() {
    const isBrowser: boolean = typeof window === 'undefined';
    return new ApolloClient({
        ssrMode: isBrowser,
        link: authLink.concat(
            createUploadLink({
                // uri: 'http://localhost:4000/graphql',
                uri: 'https://api-testing.keycapsets.com/graphql',
                // uri: 'https://api.keycapsets.com/graphql'
            })
        ),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();
    if (initialState) {
        const existingCache = _apolloClient.extract();
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }
    if (typeof window === 'undefined') return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
