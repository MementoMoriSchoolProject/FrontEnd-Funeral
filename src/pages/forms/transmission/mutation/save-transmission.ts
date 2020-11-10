import { gql, useMutation } from "@apollo/client";
import { saveTransmissions, saveTransmissionsVariables } from "./__generated__/saveTransmissions";

const SAVE_TRANSMISSIONS = gql`
mutation saveTransmissions($id: String!, $transmissions: [PersistTransmissionInput!]!) {
    saveTransmissions(
        funeralId: $id,
        transmissions: $transmissions
    )
}
`;

export const useSaveTransmissions = () => useMutation<saveTransmissions, saveTransmissionsVariables>(SAVE_TRANSMISSIONS);
