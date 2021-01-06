import { gql, useQuery } from "@apollo/client";
import { getLayOut, getLayOutVariables } from "./__generated__/getLayOut";

const GET_LAYOUT = gql`
query getLayOut($id: String!) {
    layOut(id: $id) {
    location
    address
    postalCode
    town
    startingDate
    endDate
    wayOfLayout
    typeOfLayOut
    cascetClosed
    jewellery
    broughtBy
    }
}
`;

export const useGetLayOut = (variables: getLayOutVariables) => useQuery<getLayOut>(GET_LAYOUT, { variables });
