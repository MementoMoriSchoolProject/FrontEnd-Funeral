import { gql, useQuery } from '@apollo/client';
import React, { createContext, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Flex } from 'rebass';

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const isSignedIn = useAuth();
    return (
        <Route
            {...rest}
            render={
                () => {
                    return isSignedIn ? (
                        children
                    ) : (
                        <Redirect
                            to={{ pathname: '/login' }}
                        />
                    )
                }
            }
        />
    );
};

export const ConditionedRoute: React.FC<RouteProps & { condition: boolean }> = ({ children, condition, ...rest }) => {
    return (
        <PrivateRoute {...rest}>
            {condition ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: '/login' }}
                    />
            )}
        </PrivateRoute>
    );
};

export const NonPrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const isSignedIn = useAuth();
    return (
        <Route
            {...rest}
            render={
                () => {
                    return !isSignedIn ? (
                        children
                    ) : (
                        <Redirect
                            to={{ pathname: '/' }}
                        />
                    )
                }
            }
        />
    );
};

const LOGGED_IN = gql`
    query isLoggedIn {
        loggedIn {
            id
        }
    }
`;

const AuthStateContext = createContext<boolean>(false);

export const AuthStateProvider: React.FC<{}> = (props) => {
    const { loading, data } = useQuery(LOGGED_IN);

    if (loading) {
        return (<Flex justifyContent='center' alignItems='center' height='100vh'>Loading...</Flex>);
    }
    return (
        <AuthStateContext.Provider value={!!data}>
            {props.children}
        </AuthStateContext.Provider>
    );
};

export const useAuth = () => useContext(AuthStateContext);

