import { gql, useMutation } from "@apollo/client";
import { saveAdvertisement, saveAdvertisementVariables } from "./__generated__/saveAdvertisement";

const SAVE_ADVERTISEMENT = gql`
mutation saveAdvertisement($id: String!, $advertisement: [PersistAdvertisementInput!]!) {
    saveAdvertisement(
        funeralId: $id,
        advertisement: $advertisement
    ) {
        name
    }
}
`;

export const useSaveAdvertisement = () => useMutation<saveAdvertisement, saveAdvertisementVariables>(SAVE_ADVERTISEMENT);
