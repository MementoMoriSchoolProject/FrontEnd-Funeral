import { gql, useQuery } from "@apollo/client";
import { getBuryCremation, getBuryCremationVariables } from "./__generated__/getBuryCremation";

const GET_BURYCREMATION = gql`
query getBuryCremation($id: String!) {
    buryCremation(id: $id) {
        buryCremation
        date
        timeOfArrival
        namePlace
        address
        postalCode
        location
        speakerOrder
        specialNeeds
        cascetView
        insertion
        ashesDestination
        kindOfGrave
        existingGrave
        sectionNumber
        burriedRecently
        cascetDescend
        stonemason
    }
}
`;

export const useGetBuryCremation = (variables: getBuryCremationVariables) => useQuery<getBuryCremation>(GET_BURYCREMATION, { variables });
