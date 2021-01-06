import { gql, useMutation } from "@apollo/client";
import { saveCascet, saveCascetVariables } from "./__generated__/saveCascet";

const SAVE_CASCET = gql`
mutation saveCascet($id: String!, $cascet: PersistCascetInput!) {
    saveCascet(
        funeralId: $id,
        cascet: $cascet
    ) {
        model
    }
}
`;

export const useSaveCascet = () => useMutation<saveCascet, saveCascetVariables>(SAVE_CASCET);
