import { gql, useMutation } from "@apollo/client";
import { saveClient, saveClientVariables } from "./__generated__/saveClient";

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

export const useSaveClient = () => useMutation<saveClient, saveClientVariables>(SAVE_CLIENT);
