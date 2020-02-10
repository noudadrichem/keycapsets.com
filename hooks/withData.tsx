import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-boost'
import dotenv from 'dotenv';

dotenv.config();

console.log('REST_API_ENDPOINT...', process.env.REST_API_ENDPOINT);

const config = {
    link: new HttpLink({
        uri: process.env.REST_API_ENDPOINT || 'http://localhost:4000/graphql',
    })
}

export default withData(config)
