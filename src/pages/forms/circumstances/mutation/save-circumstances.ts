import { gql, useMutation } from "@apollo/client";

const SAVE_CIRCUMSTANCES = gql`
mutation saveCircumstances($id: String!, $circumstances: PersistCircumstancesInput!) {
    saveCircumstances(
        funeralId: $id,
        circumstances: $circumstances
    ) {
        date
    }
}
`;

export const useSaveCircumstances = () => useMutation(SAVE_CIRCUMSTANCES);
