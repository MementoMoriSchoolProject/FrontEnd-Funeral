import { gql, useMutation } from "@apollo/client";
import { saveFuneralLetter, saveFuneralLetterVariables } from "./__generated__/saveFuneralLetter";

const SAVE_FUNERALLETTER = gql`
mutation saveFuneralLetter($id: String!, $funeralletter: PersistFuneralLetterInput!) {
    saveFuneralLetter(
        funeralId: $id,
        funeralletter: $funeralletter
    ) {
        type
    }
}
`;

export const useSaveFuneralLetter = () => useMutation<saveFuneralLetter, saveFuneralLetterVariables>(SAVE_FUNERALLETTER);
