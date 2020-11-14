import { gql, useQuery } from "@apollo/client";

const GET_LAYOUT = gql`
query getLayOut($id: String!) {
    layOut(id: $id) {
       
    }
}
`;

export const useGetLayOut = () => useQuery(GET_LAYOUT);
