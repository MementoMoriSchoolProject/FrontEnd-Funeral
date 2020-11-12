import { gql, useMutation } from "@apollo/client";
import { saveFinalCare, saveFinalCareVariables } from "./__generated__/saveFinalCare";

const SAVE_FINALCARE = gql`
mutation saveFinalCare($id: String!, $finalcare: PersistFinalCareInput!) {
    saveFinalCare(
        funeralId: $id,
        finalcare: $finalcare
    ) {
        date
    }
}
`;

export const useSaveFinalCare = () => useMutation<saveFinalCare, saveFinalCareVariables>(SAVE_FINALCARE);
