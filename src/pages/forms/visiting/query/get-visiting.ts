import { gql, useQuery } from "@apollo/client";
import { getVisiting, getVisitingVariables } from "./__generated__/getVisiting";

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

export const useGetVisiting = (variables: getVisitingVariables) => useQuery<getVisiting>(GET_INSURANCES, { variables });
