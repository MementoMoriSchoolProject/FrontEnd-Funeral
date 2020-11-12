import { gql, useQuery } from "@apollo/client";

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

export const useGetBuryCremation = () => useQuery(GET_BURYCREMATION);
