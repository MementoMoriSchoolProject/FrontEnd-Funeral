import { gql, useQuery } from "@apollo/client";
import { getTransport, getTransportVariables } from "./__generated__/getTransport";

const GET_TRANSPORT = gql`
query getTransport($id: String!) {
    transport(id: $id) {
      hearse
      hearsecolor
      numberoffollowcars
      numberoffollowcarscolor
      numberofflowercars
      numberofflowercarscolor
    }
}
`;

export const useGetTransport = (variables: getTransportVariables) => useQuery<getTransport>(GET_TRANSPORT, { variables });
