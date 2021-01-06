import { gql, useQuery } from "@apollo/client";
import { getAdvertisement, getAdvertisementVariables } from "./__generated__/getAdvertisement";

const GET_ADVERTISEMENT = gql`
query getAdvertisement($id: String!) {
    advertisement(id: $id) {
      name  
      columns
      detailswishes
      edition
      placementdate
    }
}
`;

export const useGetAdvertisement = (variables: getAdvertisementVariables) => useQuery<getAdvertisement>(GET_ADVERTISEMENT, { variables });
