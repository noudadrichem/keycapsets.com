import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { ME } from '../queries';
import { useContext } from 'react';
import { Context } from 'typings';
import context from '../context';
import { ApolloClient } from 'apollo-boost';

async function useMe() {
    const client: ApolloClient<any> = useApolloClient();
    const { state, dispatch } = useContext<Context>(context);
    if (state.user._id === null && state.isLoggedIn) {
        const {
            data: { me },
            loading,
        } = await client.query({
            query: ME,
        });

        if (!loading) {
            dispatch({
                type: 'set',
                payload: {
                    user: me,
                },
            });
        }
    }
}

export default useMe;
