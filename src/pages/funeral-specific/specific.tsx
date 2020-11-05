import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelectedFuneral } from '../../utils/selected-funeral';

export const FuneralSpecificPage: React.FC<{}> = () => {
    const [funeral] = useSelectedFuneral();
    return (
        <>
            Funeral specific page for ID {funeral?.id}.
        </>
    );
};
