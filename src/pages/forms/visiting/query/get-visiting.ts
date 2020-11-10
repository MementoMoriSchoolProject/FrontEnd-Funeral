import { gql, useQuery } from "@apollo/client";

const GET_INSURANCES = gql`
query getVisiting($id: String!) {
    visiting(id: $id) {
      location  
      date
      kindOfVisit
      timeOfArrival
      timeOfLeave
      specialNeeds
    }
}
`;

export const useGetVisiting = () => useQuery(GET_INSURANCES);
