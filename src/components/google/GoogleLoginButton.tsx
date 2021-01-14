import React from 'react';
import { GoogleLogin } from 'react-google-login';

export const GoogleLoginButton: React.FC<{}> = () => {
    const onSucces = (response: any) => {
        // eslint-disable-next-line no-console
        console.log(response.profileObj);
    };

    const onFailure = (response: any) => {
        // eslint-disable-next-line no-console
        console.log(response);
    };

    return (
        <>
            <GoogleLogin
                clientId="720173283753-ddbv87j4evpgokb7cr2euacj28n6deqe.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSucces}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
                isSignedIn
            />
        </>
    );
};
