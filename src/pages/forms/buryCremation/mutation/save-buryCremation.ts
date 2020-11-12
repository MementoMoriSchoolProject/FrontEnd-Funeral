import { gql, useMutation } from "@apollo/client";

const SAVE_BURYCREMATION = gql`
mutation saveBuryCremation($id: String!, $ceremony: PersistCeremonyInput!) {
    saveCeremony(
        funeralId: $id,
        buryCremation: $buryCremation
    ) {
        buryCremation
    }
}
`;

export const useSaveBuryCremation = () => useMutation(SAVE_BURYCREMATION);
