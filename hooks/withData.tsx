import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { StateProvider } from '../context';

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            // uri: 'https://testing-api.keycapsets.com/graphql',
            // uri: 'http://localhost:4000/graphql',
            uri: 'https://api.keycapsets.com/graphql',
            cache: new InMemoryCache().restore(initialState || {}),
            request: (operation) => {
                const token = localStorage.getItem('TOKEN');
                operation.setContext({
                    headers: {
                        authorization: token ? `Bearer ${token}` : null,
                    },
                });
            },
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <StateProvider>
                    <ApolloProvider client={props.apollo}>
                        <Page {...props} />
                    </ApolloProvider>
                </StateProvider>
            );
        },
    }
);
