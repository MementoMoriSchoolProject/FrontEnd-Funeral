import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { createFuneral } from './__generated__/createFuneral';

const CREATE_FUNERAL = gql`
mutation createFuneral {
    createFuneral {
        id
    }
}
`;

export const useCreateFuneral = (options?: MutationHookOptions<createFuneral>) => useMutation<createFuneral>(CREATE_FUNERAL, options);
