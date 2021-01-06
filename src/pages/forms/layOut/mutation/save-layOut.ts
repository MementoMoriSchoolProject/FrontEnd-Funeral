import { gql, useMutation } from "@apollo/client";
import { saveLayOut, saveLayOutVariables } from "./__generated__/saveLayOut";

const SAVE_LAYOUT = gql`
mutation saveLayOut($id: String!, $layOut: PersistLayOutInput!) {
    saveLayOut(
        funeralId: $id,
        layOut: $layOut
    ) {
        location
    }
}
`;

export const useSaveLayOut = () => useMutation<saveLayOut, saveLayOutVariables>(SAVE_LAYOUT);
