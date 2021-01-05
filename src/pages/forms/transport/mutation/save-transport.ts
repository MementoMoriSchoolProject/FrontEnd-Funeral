import { gql, useMutation } from "@apollo/client";
import { saveTransport, saveTransportVariables } from "./__generated__/saveTransport";

const SAVE_TRANSPORT = gql`
mutation saveTransport($id: String!, $transport: PersistTransportInput!) {
    saveTransport(
        funeralId: $id,
        transport: $transport
    ) {
        hearse
    }
}
`;

export const useSaveTransport = () => useMutation<saveTransport, saveTransportVariables>(SAVE_TRANSPORT);
