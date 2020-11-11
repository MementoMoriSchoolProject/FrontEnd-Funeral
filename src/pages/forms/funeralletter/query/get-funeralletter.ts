import { gql, useQuery } from "@apollo/client";
import { getFuneralLetter, getFuneralLetterVariables } from "./__generated__/getFuneralLetter";

const GET_FUNERALLETTER = gql`
query getFuneralLetter($id: String!) {
    funeralletter(id: $id) {
        type
        total
        numberOfPorti
        numberOfShipments
        details
    }
}
`;

export const useFuneralLetter = (variables: getFuneralLetterVariables) => useQuery<getFuneralLetter>(GET_FUNERALLETTER, { variables });
