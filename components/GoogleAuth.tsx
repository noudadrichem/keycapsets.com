import React, { useContext } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { ApolloClient } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';
import { useRouter, Router } from 'next/router';
import { Context } from 'typings';

import { GOOGLE_LOGIN } from '../queries';

import Button from './Button';
import GoogleIcon from './GoogleIcon';
import { loginUser, logoutUser } from '../utils/user';
import context from '../context';

const CLIENT_ID = '22533085590-p56b9iva0qoq0btq94q252uuv34rphec.apps.googleusercontent.com';

interface GoogleAuthProps {
    asLink?: boolean;
    text: string;
    callback?: Function;
    isLogginOut?: boolean;
    disabled: boolean;
}

function GoogleAuth(props: GoogleAuthProps): JSX.Element {
    const { text, disabled, asLink = false, isLogginOut = false } = props;
    const client: ApolloClient<any> = useApolloClient();
    const router = useRouter();
    const { dispatch } = useContext<Context>(context);

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
            dispatch({
                type: 'user',
                payload: {
                    user: googleLogin.user,
                },
            });
            loginUser(googleLogin);

            if (googleLogin.firstLogin) {
                window.location.href = '/user/edit';
                return;
            }
            window.location.href = '/';
        } catch (err) {
            console.error(err);
        }
    }

    function error(response: any) {
        console.error('error', response);
    }

    function logout() {
        console.log('logout...');
        logoutUser();
    }

    if (isLogginOut) {
        return <GoogleLogout clientId={CLIENT_ID} buttonText="Logout" onLogoutSuccess={logout} />;
    }

    return (
        <GoogleLogin
            clientId={CLIENT_ID}
            onSuccess={success}
            onFailure={error}
            responseType="id_token"
            cookiePolicy={'single_host_origin'}
            disabled={disabled}
            render={(renderProps) =>
                asLink ? (
                    <a onClick={renderProps.onClick}>
                        <GoogleIcon variant="dark" />
                        {text}
                    </a>
                ) : (
                    <Button
                        onClick={renderProps.onClick}
                        variant="primary"
                        size="md"
                        className="google-button"
                        isDisabled={disabled}
                    >
                        <GoogleIcon variant="white" size={16} />
                        {text}
                    </Button>
                )
            }
        />
    );
}

export default GoogleAuth;
