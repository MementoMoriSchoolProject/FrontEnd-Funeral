import { gql, useMutation } from "@apollo/client";

const SAVE_CLIENT = gql`
mutation saveClient($id: String!, $client: PersistDeceasedInput!) {
    saveClient(
        funeralId: $id,
        client: $client
    ) {
        firstname
    }
}
`;

export const useSaveClient = () => useMutation(SAVE_CLIENT);
