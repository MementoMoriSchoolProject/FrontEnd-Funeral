import { gql, useQuery } from "@apollo/client";
import { inbox, inboxVariables } from "./__generated__/inbox";

const GET_EMAILS = gql`
query inbox($input: EmailInput!) {
    emails(input: $input) {
        emails {
            content
            subject
            snippet
            to
            from
            date
            labels
            read
        }
        page
        amount
    }
}
`;

export const useGetEmails = (variables: inboxVariables) => useQuery<inbox, inboxVariables>(GET_EMAILS, { variables });
