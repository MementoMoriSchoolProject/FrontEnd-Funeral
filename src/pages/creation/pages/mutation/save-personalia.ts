import { gql, useMutation } from "@apollo/client";
import { savePersonalia, savePersonaliaVariables } from "./__generated__/savePersonalia";

const SAVE_PERSONALIA = gql`
mutation savePersonalia($id: String!, $personalia: PersistDeceasedInput!) {
    savePersonalia(
        funeralId: $id,
        personalia: $personalia
    ) {
        id
    }
}
`;

export const useSavePersonalia = () => useMutation<savePersonalia, savePersonaliaVariables>(SAVE_PERSONALIA);
