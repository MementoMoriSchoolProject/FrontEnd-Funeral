import { gql, useQuery } from "@apollo/client";
import { getFarewell, getFarewellVariables } from "./__generated__/getFarewell";

const GET_FAREWELL = gql`
query getFarewell($id: String!) {
    farewell(id: $id) {
        pastor
        location
        address
        postalCode
        place
        date
        startTime
        carrying
        numberOfCarriers
        parkingSpaces
        details
    }
}
`;

export const useFarewell = (variables: getFarewellVariables) => useQuery<getFarewell>(GET_FAREWELL, { variables });
