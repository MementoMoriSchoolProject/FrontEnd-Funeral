import { gql, useQuery } from "@apollo/client";
import { getPersonalia, getPersonaliaVariables } from "./__generated__/getPersonalia";

const GET_PERSONALIA = gql`
query getPersonalia($id: String!) {
    personalia(id: $id) {
        firstname
        lastname
        girlname
        callname
        title
        gender
        address
        postal
        town
        bsn
        dateOfBirth
        amountOfChildren
        amountOfMinors
        maritalStatus
        religion
    }
}
`;

export const useGetPersonalia = (variables: getPersonaliaVariables) => useQuery<getPersonalia>(GET_PERSONALIA, { variables });
