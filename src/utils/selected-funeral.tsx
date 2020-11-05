import { gql, useQuery } from '@apollo/client';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { Flex } from 'rebass';
import { funeral, funeral_funeral } from './__generated__/funeral';

const FUNERAL = gql`
query funeral($id: String) {
    funeral(id: $id) {
        id
    }
}
`;

const SelectedFuneralContext = createContext<[funeral_funeral | null, Dispatch<SetStateAction<string | undefined>>]>([null, () => {}]);

export const SelectedFuneralProvider: React.FC<{}> = (props) => {
    const [activeFuneralId, setActiveFuneralId] = useState<string | undefined>(undefined);
    const { loading, data } = useQuery<funeral>(FUNERAL, { variables: { id: activeFuneralId } });

    if (loading) {
        return (<Flex justifyContent='center' alignItems='center' height='100vh'>Loading...</Flex>);
    }
    return (
        <SelectedFuneralContext.Provider value={[ data ? data.funeral : null, setActiveFuneralId ]}>
            {props.children}
        </SelectedFuneralContext.Provider>
    );
};

export const useSelectedFuneral = () => useContext(SelectedFuneralContext);
