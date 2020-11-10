import { gql, useQuery } from "@apollo/client";
import { getInsurances, getInsurancesVariables } from "./__generated__/getInsurances";

const GET_INSURANCES = gql`
query getInsurances($id: String!) {
    insurances(id: $id) {
        company
        policynumber
    }
}
`;

export const useGetInsurances = (variables: getInsurancesVariables) => useQuery<getInsurances>(GET_INSURANCES, { variables });
