import { gql, useMutation } from "@apollo/client";
import { saveNightguard, saveNightguardVariables } from "./__generated__/saveNightguard";

const SAVE_NIGHTGUARD = gql`
mutation saveNightguard($id: String!, $nightguard: PersistNightguardInput!) {
    saveNightguard(
        funeralId: $id,
        nightguard: $nightguard
    ) {
        location
    }
}
`;

export const useSaveNightguard = () => useMutation<saveNightguard, saveNightguardVariables>(SAVE_NIGHTGUARD);
