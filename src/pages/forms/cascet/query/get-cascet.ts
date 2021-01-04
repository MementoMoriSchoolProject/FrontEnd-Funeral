import { gql, useQuery } from "@apollo/client";
import { getCascet, getCascetVariables } from "./__generated__/getCascet";

const GET_CASCET = gql`
query getCascet($id: String!) {
    cascet(id: $id) {
        model
        length
        width
        cross
    }
}
`;

export const useGetCascet = (variables: getCascetVariables) => useQuery<getCascet>(GET_CASCET, { variables });
