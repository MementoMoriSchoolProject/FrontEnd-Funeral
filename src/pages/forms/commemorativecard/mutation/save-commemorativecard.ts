import { gql, useMutation } from "@apollo/client";
import { saveCommemorativeCard, saveCommemorativeCardVariables } from "./__generated__/saveCommemorativeCard";

const SAVE_COMMEMORATIVECARD = gql`
mutation saveCommemorativeCard($id: String!, $commemorativecard: PersistCommemorativeCardInput!) {
    saveCommemorativeCard(
        funeralId: $id,
        commemorativecard: $commemorativecard
    ) {
        type
    }
}
`;

export const useSaveCommemorativeCard = () => useMutation<saveCommemorativeCard, saveCommemorativeCardVariables>(SAVE_COMMEMORATIVECARD);
