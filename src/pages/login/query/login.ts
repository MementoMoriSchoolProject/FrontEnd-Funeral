import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(input: {
        email: $email,
        password: $password
    })
}
`;

export const useLogin = () => useMutation(LOGIN);
