import { gql, useQuery } from "@apollo/client";
import { getCircumstances, getCircumstancesVariables } from "./__generated__/getCircumstances";

const GET_CIRCUMSTANCES = gql`
query getCircumstances($id: String!) {
    circumstances(id: $id) {
        date
        time
        address
        postal
        town
        cause
        reasonForProcrastination
    }
}
`;

export const useGetCircumstances = (variables: getCircumstancesVariables) => useQuery<getCircumstances>(GET_CIRCUMSTANCES, { variables });
