import { gql, useQuery } from "@apollo/client";
import { getTransmissions, getTransmissionsVariables } from "./__generated__/getTransmissions";

const GET_TRANSMISSIONS = gql`
query getTransmissions($id: String!) {
    transmissions(id: $id) {
        date
        by
        from
        to
        fromAddress
        toAddress
        fromPlace
        toPlace
    }
}
`;

export const useGetTransmissions = (variables: getTransmissionsVariables) => useQuery<getTransmissions>(GET_TRANSMISSIONS, { variables });
