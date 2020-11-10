import { gql, useMutation } from "@apollo/client";

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

export const useSaveFinalCare = () => useMutation(SAVE_FINALCARE);
