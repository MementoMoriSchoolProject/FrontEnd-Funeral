import { gql, useMutation } from "@apollo/client";
import { saveCoffeeRoom, saveCoffeeRoomVariables } from "./__generated__/saveCoffeeRoom";

const SAVE_COFFEEROOM = gql`
mutation saveCoffeeRoom($id: String!, $coffeeroom: PersistCoffeeRoomInput!) {
    saveCoffeeRoom(
        funeralId: $id,
        coffeeroom: $coffeeroom
    ) {
        date
    }
}
`;

export const useSaveCoffeeRoom = () => useMutation<saveCoffeeRoom, saveCoffeeRoomVariables>(SAVE_COFFEEROOM);
