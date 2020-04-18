import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            // uri: 'http://localhost:4000/graphql',
            uri: 'https://api.keycapsets.com/graphql',
            cache: new InMemoryCache().restore(initialState || {}),
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        },
    }
);
