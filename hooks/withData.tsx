import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { concatPagination } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';

let apolloClient;

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('TOKEN');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

function createApolloClient() {
    const isBrowser: boolean = typeof window === 'undefined';
    // const token: string = isBrowser ? window.localStorage.getItem('TOKEN') : '';
    return new ApolloClient({
        ssrMode: isBrowser,
        link: authLink.concat(
            createUploadLink({
                uri: 'http://localhost:4000/graphql',
            })
        ),
        // link: new HttpLink({
        //     uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
        //     //   credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        //     headers: {
        //         authorization: token ? `Bearer ${token}` : null,
        //     }
        // }),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();
        // Restore the cache using the data passed from getStaticProps/getServerSideProps
        // combined with the existing cached data
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}

// import withApollo from 'next-with-apollo';
// // import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
// import { ApolloProvider } from '@apollo/react-hooks';
// import { createUploadLink } from 'apollo-upload-client';

// import { StateProvider } from '../context';

// export default withApollo(
//     ({ initialState }) => {
//         // return new ApolloClient({
//         //     ssrMode: typeof window === 'undefined',
//         //     link: createUploadLink({
//         //         uri: 'https://api.keycapsets.com/graphql',
//         //     }),
//         //     cache: new InMemoryCache().restore(initialState || {}),
//         //     // link: new HttpLink({
//         //     //   uri: 'https://nextjs-graphql-with-prisma-simple.vercel.app/api', // Server URL (must be absolute)
//         //     //   credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
//         //     // }),
//         //   })

//         return new ApolloClient({
//             // uri: 'https://testing-api.keycapsets.com/graphql',
//             uri: 'http://localhost:4000/graphql',
//             // link: createUploadLink({
//             //     uri: 'https://api.keycapsets.com/graphql',
//             // }),
//             cache: new InMemoryCache().restore(initialState || {}),
//             request: (operation) => {
//                 operation.setContext({
//                     headers: {
//                         authorization: token ? `Bearer ${token}` : null,
//                     },
//                 });
//             },
//         });
//     },
//     {
//         render: ({ Page, props }) => {
//             return (
//                 <StateProvider>
//                     <ApolloProvider client={props.apollo}>
//                         <Page {...props} />
//                     </ApolloProvider>
//                 </StateProvider>
//             );
//         },
//     }
// );
