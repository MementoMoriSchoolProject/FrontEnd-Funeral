import { gql, useMutation } from "@apollo/client";
import { saveCircumstances, saveCircumstancesVariables } from "./__generated__/saveCircumstances";

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

export const useSaveCircumstances = () => useMutation<saveCircumstances, saveCircumstancesVariables>(SAVE_CIRCUMSTANCES);
