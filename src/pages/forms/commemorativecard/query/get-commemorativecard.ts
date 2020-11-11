import { gql, useQuery } from "@apollo/client";
import { getCommemorativeCard, getCommemorativeCardVariables } from "./__generated__/getCommemorativeCard";

const GET_COMMEMORATIVECARD = gql`
query getCommemorativeCard($id: String!) {
    commemorativecard(id: $id) {
        type
        total
        details
    }
}
`;

export const useCommemorativeCard = (variables: getCommemorativeCardVariables) => useQuery<getCommemorativeCard>(GET_COMMEMORATIVECARD, { variables });
