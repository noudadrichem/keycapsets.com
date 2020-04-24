import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { ApolloClient } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';

import { GOOGLE_LOGIN } from '../queries';

import Button from './Button';
import GoogleIcon from './GoogleIcon';
import { loginUser } from '../utils/userLogin';
import { useRouter } from 'next/router';
import { Context } from 'typings';
import context from '../context';

const CLIENT_ID = '22533085590-p56b9iva0qoq0btq94q252uuv34rphec.apps.googleusercontent.com';

interface GoogleAuthProps {
    asLink?: boolean;
    text: string;
    callback?: Function;
}

function GoogleAuth(props: GoogleAuthProps): JSX.Element {
    const { text, asLink = false } = props;
    const client: ApolloClient<any> = useApolloClient();
    const router = useRouter();
    const { state, dispatch } = useContext<Context>(context);

    async function success(response: any) {
        try {
            const {
                data: { googleLogin },
            } = await client.mutate({
                mutation: GOOGLE_LOGIN,
                variables: {
                    token: response.tokenId,
                },
            });
            loginUser(googleLogin);
            dispatch({
                type: 'set',
                payload: {
                    isLoggedIn: true,
                },
            });
            router.push('/');
        } catch (err) {
            console.error(err);
        }
    }

    function error(response: any) {
        console.error('error', response);
    }

    return (
        <GoogleLogin
            clientId={CLIENT_ID}
            onSuccess={success}
            onFailure={error}
            responseType="id_token"
            cookiePolicy={'single_host_origin'}
            render={(renderProps) =>
                asLink ? (
                    <a onClick={renderProps.onClick}>
                        <GoogleIcon variant="dark" />
                        {text}
                    </a>
                ) : (
                    <Button onClick={renderProps.onClick} variant="primary" size="md" className="google-button">
                        <GoogleIcon variant="white" />
                        {text}
                    </Button>
                )
            }
        />
    );
}

export default GoogleAuth;
