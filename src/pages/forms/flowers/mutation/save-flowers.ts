import { gql, useMutation } from "@apollo/client";
import { saveFlowers, saveFlowersVariables } from "./__generated__/saveFlowers";

const SAVE_FLOWERS = gql`
mutation saveFlowers($id: String!, $flowers: PersistFlowersInput!) {
    saveFlowers(
        funeralId: $id,
        flowers: $flowers
    )
    { 
        supplier
    }
}
`;

export const useSaveFlowers = () => useMutation<saveFlowers, saveFlowersVariables>(SAVE_FLOWERS);
