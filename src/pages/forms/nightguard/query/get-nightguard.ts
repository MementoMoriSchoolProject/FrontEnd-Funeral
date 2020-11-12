import { gql, useQuery } from "@apollo/client";
import { getNightguard, getNightguardVariables } from "./__generated__/getNightguard";

const GET_NIGHTGUARD = gql`
query getNightguard($id: String!) {
    nightguard(id: $id) {
        location
        predecessor
        date
        time
        specialNeeds
    }
}
`;

export const useGetNightguard = (variables: getNightguardVariables) => useQuery<getNightguard>(GET_NIGHTGUARD, { variables });