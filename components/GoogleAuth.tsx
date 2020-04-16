import React from 'react';
import GoogleLogin from 'react-google-login';

interface GoogleAuthProps {}

function GoogleAuth(props: GoogleAuthProps) {
    function success(response) {
        console.log(response);

        // try {
        //     const authResult = await client.mutate({
        //         mutation: gql`
        //             mutation googleLogin($idToken: String!) {
        //                 googleLogin(idToken: $idToken) {
        //                 token
        //                 user {
        //                     id
        //                 }
        //                 firstLogin
        //                 }
        //             }
        //             `,
        //         variables: {
        //             idToken: response.tokenId
        //         }
        //     });

        //     const { token } = authResult.data.googleLogin;
        //     dispatch(login({ token }));
        //     dispatch(closeAuthModal());
        // } catch (err) {
        //     console.warn(err);
        // }
    }

    function error(res) {
        console.log('error', res);
    }

    return (
        <GoogleLogin
            clientId={CLIENT_ID}
            onSuccess={success}
            onFailure={error}
            responseType="id_token"
            render={(renderProps) => (
                <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="btn btn-block btn-white btn-icon"
                >
                    <span className="btn-inner--text">Google</span>
                </button>
            )}
        />
    );
}

export default GoogleAuth;
