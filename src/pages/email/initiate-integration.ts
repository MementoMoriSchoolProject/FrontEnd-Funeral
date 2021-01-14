import { gql, useMutation } from "@apollo/client";
import { initiateIntegration, initiateIntegrationVariables } from "./__generated__/initiateIntegration";

const INITIATE_INTEGRATION = gql`
mutation initiateIntegration($redirect: String!) {
    authorizeGoogleForEmail(redirectUri: $redirect)
}
`;

export const useInitiateGmailIntegration = () => useMutation<initiateIntegration, initiateIntegrationVariables>(INITIATE_INTEGRATION);
