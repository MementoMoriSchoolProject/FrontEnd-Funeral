import { gql, useQuery } from "@apollo/client";

const GET_CLIENT = gql`
query getClient($id: String!) {
    client(id: $id) {
        firstname
        lastname
        girlname
        callname
        gender
        address
        postal
        town
        dateOfBirth
        phoneNumber
        emailAddress
        relation
    }
}
`;

export const useGetClient = () => useQuery(GET_CLIENT);
