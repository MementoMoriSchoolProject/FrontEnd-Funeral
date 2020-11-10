import { gql, useQuery } from "@apollo/client";
import { getClient, getClientVariables } from "./__generated__/getClient";

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

export const useGetClient = (variables: getClientVariables) => useQuery<getClient>(GET_CLIENT, { variables });
