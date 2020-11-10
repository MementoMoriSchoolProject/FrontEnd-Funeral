import { gql, useMutation } from "@apollo/client";

const SAVE_VISITING = gql`
mutation saveVisiting($id: String!, $visiting: [PersistVisitingInput!]!) {
    saveVisiting(
        funeralId: $id,
        visiting: $visiting
    )
}
`;

export const useSaveVisiting = () => useMutation(SAVE_VISITING);
