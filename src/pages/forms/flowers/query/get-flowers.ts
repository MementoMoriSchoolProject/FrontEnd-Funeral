import { gql, useQuery } from "@apollo/client";
import { getFlowers, getFlowersVariables } from "./__generated__/getFlowers";

const GET_FLOWERS = gql`
query getFlowers($id: String!) {
    flowers(id: $id) {
      supplier
      flowers {
        formatting
        textOnLint1
        textOnLint2
        colorOnLint
        costFlower
      }
      deliveryDate
      finalTime
      totalCost
      deliveryLocation
      postalCode
      location
    }
}
`;

export const useGetFlowers = (variables: getFlowersVariables) => useQuery<getFlowers>(GET_FLOWERS, { variables });
