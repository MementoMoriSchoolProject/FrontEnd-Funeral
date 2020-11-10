import { gql, useMutation } from "@apollo/client";
import { saveTransmission, saveTransmissionVariables } from "./__generated__/saveTransmission";

const SAVE_TRANSMISSION = gql`
mutation saveTransmission($id: String!, $transmission: PersistTransmissionInput!) {
    saveTransmission(
        funeralId: $id,
        transmission: $transmission
    ) {
        date
    }
}
`;

export const useSaveTransmission = () => useMutation<saveTransmission, saveTransmissionVariables>(SAVE_TRANSMISSION);
