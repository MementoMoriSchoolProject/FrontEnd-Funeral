import { gql, useQuery } from "@apollo/client";
import { getFinalCare, getFinalCareVariables } from "./__generated__/getFinalCare";

const GET_FINALCARE = gql`
query getFinalCare($id: String!) {
    finalcare(id: $id) {
        date
        deletePacemaker
        location
        makeFingerprint
        family
        clothes
        wishesJewelryGlasses
        detailsOfCare
    }
}
`;

export const useFinalCare = (variables: getFinalCareVariables) => useQuery<getFinalCare>(GET_FINALCARE, { variables });