import { gql, useQuery } from "@apollo/client";
import { getCoffeeRoom, getCoffeeRoomVariables } from "./__generated__/getCoffeeRoom";

const GET_COFFEEROOM = gql`
query getCoffeeRoom($id: String!) {
    coffeeroom(id: $id) {
        usagecoffeeroom
        locationelsewhere
        addresselsewhere
        postalelsewhere
        placeelsewhere
        time
        extratime
        amountpersons
        amountreservations
        departuretime
        date
        particularities
    }
}
`;

export const useGetCoffeeRoom = (variables: getCoffeeRoomVariables) => useQuery<getCoffeeRoom>(GET_COFFEEROOM, { variables });
