import { gql, useMutation } from "@apollo/client";
import { saveCeremony, saveCeremonyVariables } from "./__generated__/saveCeremony";

const SAVE_CEREMONY = gql`
mutation saveCeremony($id: String!, $ceremony: PersistCeremonyInput!) {
    saveCeremony(
        funeralId: $id,
        ceremony: $ceremony
    ) {
        date
    }
}
`;

export const useSaveCeremony = () => useMutation<saveCeremony, saveCeremonyVariables>(SAVE_CEREMONY);
