import { gql, useMutation } from '@apollo/client';
import { saveLastPage, saveLastPageVariables } from './__generated__/saveLastPage';

const SAVE_LAST_PAGE = gql`
mutation saveLastPage($id: String!, $page: Float) {
    saveLastPage(id: $id, page: $page)
}
`;

export const useSaveLastPage = () => useMutation<saveLastPage, saveLastPageVariables>(SAVE_LAST_PAGE);
