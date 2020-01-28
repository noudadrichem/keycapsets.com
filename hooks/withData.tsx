import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-boost'

const config = {
    link: new HttpLink({
        uri: 'http://localhost:4000',
    })
}

export default withData(config)
