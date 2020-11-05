import { gql, useQuery } from '@apollo/client';
import { funerals } from './__generated__/funerals';

const FUNERALS = gql`
query funerals {
    funerals {
        id
        deceased {
            id
            firstname
            lastname
        }
    }
}
`;

export const useFunerals = () => useQuery<funerals>(FUNERALS);
