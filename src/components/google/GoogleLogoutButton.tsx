import React from 'react';
import { GoogleLogout } from 'react-google-login';

export const GoogleLogoutButton: React.FC<{}> = () => {
    const onSucces = () => {
        // eslint-disable-next-line no-console
        console.log("logout succes");
    };

    return (
        <>
            <GoogleLogout
                clientId="720173283753-ddbv87j4evpgokb7cr2euacj28n6deqe.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={onSucces}
            />
        </>
    );
};
