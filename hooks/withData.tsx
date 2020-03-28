import withApollo from 'next-with-apollo';
import { InMemoryCache, ApolloLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createUploadLink} from 'apollo-upload-client';
import ApolloClient from 'apollo-client';

const LOCAL_URI = 'http://localhost:4000/graphql';
const PROD_URI =  'https://api.keycapsets.com/graphql'

const uploadLink = createUploadLink({
    uri: LOCAL_URI,
    headers: {
        "keep-alive": "true"
    }
});

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            // uri: LOCAL_URI,
            cache: new InMemoryCache().restore(initialState || {}),
            link: uploadLink
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);
