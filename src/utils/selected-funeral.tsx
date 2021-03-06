import { gql, useQuery } from '@apollo/client';
import React, { createContext, useContext, useState } from 'react';
import { Flex } from 'rebass';
import { Spinner } from '../atoms/spinner';
import { funeral, funeral_funeral } from './__generated__/funeral';

const ACTIVE_FUNERAL = 'active-funeral';

const FUNERAL = gql`
query funeral($id: String) {
    funeral(id: $id) {
        id
        lastCreationStep
        deceased {
            firstname
            lastname
        }
    }
}
`;

const SelectedFuneralContext = createContext<[funeral_funeral | null, (_id?: string) => void, () => Promise<any>]>([null, () => {}, async () => null]);

export const SelectedFuneralProvider: React.FC<{}> = (props) => {
    localStorage.getItem('activeFuneral');
    const [activeFuneralId, setActiveFuneralId] = useState<string | undefined>(localStorage.getItem(ACTIVE_FUNERAL) || undefined);
    const { loading, data, refetch } = useQuery<funeral>(FUNERAL, { variables: { id: activeFuneralId } });

    const setActiveFuneral = (id?: string) => {
        if (!id) {
            localStorage.removeItem(ACTIVE_FUNERAL);
        } else {
            localStorage.setItem(ACTIVE_FUNERAL, id);
        }
        setActiveFuneralId(id);
    };

    if (loading) {
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Spinner />
            </Flex>
        );
    }
    return (
        <SelectedFuneralContext.Provider value={[data ? data.funeral : null, setActiveFuneral, () => refetch({ variables: { id: activeFuneralId } })]}>
            {props.children}
        </SelectedFuneralContext.Provider>
    );
};

export const useSelectedFuneral = () => useContext(SelectedFuneralContext);
