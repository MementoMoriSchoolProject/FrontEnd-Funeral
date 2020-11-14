import { gql, useMutation } from "@apollo/client";

const SAVE_LAYOUT = gql`
mutation saveLayOut($id: String!, $layOut: PersistLayOutInput!) {
    saveClient(
        funeralId: $id,
        layOut: $layOut
    ) {
        //
    }
}
`;

export const useSaveLayOut = () => useMutation(SAVE_LAYOUT);
