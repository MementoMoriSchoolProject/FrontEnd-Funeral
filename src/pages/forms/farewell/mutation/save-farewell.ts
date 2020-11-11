import { gql, useMutation } from "@apollo/client";
import { saveFarewell, saveFarewellVariables } from "./__generated__/saveFarewell";

const SAVE_FAREWELL = gql`
mutation saveFarewell($id: String!, $farewell: PersistFarewellServiceInput!) {
    saveFarewell(
        funeralId: $id,
        farewell: $farewell
    ) {
        date
    }
}
`;

export const useSaveFarewell = () => useMutation<saveFarewell, saveFarewellVariables>(SAVE_FAREWELL);
