import { gql, useMutation } from "@apollo/client";
import { saveInsurances, saveInsurancesVariables } from "./__generated__/saveInsurances";

const SAVE_INSURANCES = gql`
mutation saveInsurances($id: String!, $insurances: [PersistInsuranceInput!]!) {
    saveInsurances(
        funeralId: $id,
        insurances: $insurances
    )
}
`;

export const useSaveInsurances = () => useMutation<saveInsurances, saveInsurancesVariables>(SAVE_INSURANCES);
