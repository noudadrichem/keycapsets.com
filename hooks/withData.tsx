import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

let apolloClient: ApolloClient<{}>;
let token: string;

// uri: 'https://api-testing.keycapsets.com/graphql',
// const apiUrl = process.env.NODE_ENV === 'production' ? 'https://api.keycapsets.com/graphql' : 'http://localhost:4000/graphql';
const apiUrl = 'https://api.keycapsets.com/graphql';
// const apiUrl = 'http://localhost:4000/graphql';

console.log('API URL = ', apiUrl, process.env.NODE_ENV);

const authLink = setContext((_, { headers }) => {
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('TOKEN');
    }

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
                uri: apiUrl,
            })
        ),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState = null): ApolloClient<{}> {
    const _apolloClient = apolloClient ?? createApolloClient();
    if (initialState) {
        const existingCache = _apolloClient.extract();
        _apolloClient.cache.restore({ ...initialState, ...existingCache });
    }
    if (typeof window === 'undefined') return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
