import { gql, useQuery } from '@apollo/client';
import { funerals } from './__generated__/funerals';

const FUNERALS = gql`
query funerals {
    funerals {
        id
    }
}
`;

export const useFunerals = () => useQuery<funerals>(FUNERALS);
