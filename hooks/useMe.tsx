import { useQuery, useApolloClient, ApolloClient } from '@apollo/react-hooks';
import { ME } from '../queries';
import { useContext, useEffect } from 'react';
import { Context } from 'typings';
import context from '../context';
import user from '../pages/user';

async function useMe() {
    //! NOT USED ANYMORE
    const client: ApolloClient<any> = useApolloClient();
    const { state, dispatch } = useContext<Context>(context);

    if (state.isLoggedIn) {
        console.log('fetch me...');
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
