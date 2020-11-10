import { gql, useMutation } from "@apollo/client";
import { saveVisiting, saveVisitingVariables } from "./__generated__/saveVisiting";

const SAVE_VISITING = gql`
mutation saveVisiting($id: String!, $visiting: [PersistVisitingInput!]!) {
    saveVisiting(
        funeralId: $id,
        visiting: $visiting
    )
}
`;

export const useSaveVisiting = () => useMutation<saveVisiting, saveVisitingVariables>(SAVE_VISITING);
