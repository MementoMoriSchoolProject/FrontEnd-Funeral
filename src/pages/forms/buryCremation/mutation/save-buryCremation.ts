import { gql, useMutation } from "@apollo/client";
import { saveBuryCremation, saveBuryCremationVariables } from "./__generated__/saveBuryCremation";

const SAVE_BURYCREMATION = gql`
mutation saveBuryCremation($id: String!, $burycremation: PersistBuryCremationInput!) {
    saveBuryCremation(
        funeralId: $id,
        burycremation: $burycremation
    ) {
        buryCremation
    }
}
`;

export const useSaveBuryCremation = () => useMutation<saveBuryCremation, saveBuryCremationVariables>(SAVE_BURYCREMATION);
