import { gql, useQuery } from "@apollo/client";
import { getTransmission, getTransmissionVariables } from "./__generated__/getTransmission";

const GET_TRANSMISSION = gql`
query getTransmission($id: String!) {
    transmission(id: $id) {
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

export const useGetTransmission = (variables: getTransmissionVariables) => useQuery<getTransmission>(GET_TRANSMISSION, { variables });
