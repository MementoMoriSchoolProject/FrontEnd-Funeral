import React from 'react';
import { useSelectedFuneral } from '../../utils/selected-funeral';
import { CreatingFuneral } from '../create/creation-framework';
import { FuneralSpecificOverview } from './overview';

export const FuneralSpecificPage: React.FC<{}> = () => {
    const [funeral] = useSelectedFuneral();
    return funeral?.lastCreationStep !== null ? <CreatingFuneral /> : <FuneralSpecificOverview />;
};
