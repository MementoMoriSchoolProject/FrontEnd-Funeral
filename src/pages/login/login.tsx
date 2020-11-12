import { Input, Label } from '@rebass/forms';
import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Flex } from 'rebass';
import { Heading } from '../../atoms/heading';
import { ProgressButton } from '../../atoms/progress-button';
import { useLogin } from './query/login';

export const LoginPage: React.FC<{}> = () => {
    const history = useHistory();
    const [login, { loading, error }] = useLogin();

    return (
        <Flex justifyContent="center" alignItems="center" height="100vh" bg="background">
            <Box p={3} variant="card">
                <Heading level={1}>Login</Heading>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(values) => login({
                        variables: values
                    }).then(async ({ data }) => {
                        if (data?.login) {
                            // login successful
                            localStorage.setItem('token', data.login);
                            await history.push('/');
                        }
                    })}
                >
                    {({ submitForm, values, handleChange, handleBlur }) => (
                        <Flex flexDirection="column">
                            {error ? (
                                <>
                                    {error.graphQLErrors.map(({ message }) => (
                                        <Label>{message}</Label>
                                    ))}
                                </>
                            ) : null}
                            <Input
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ProgressButton loading={loading} type="submit" onClick={submitForm}>
                                Login
                            </ProgressButton>
                        </Flex>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
};
