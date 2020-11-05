import React from 'react';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { Insurance } from '../../forms/insurance';
import { Personalia } from '../../forms/personalia';
import { PageTemplate } from '../page-template';
import { useSavePersonalia } from './mutation/save-personalia';

export const DeceasedInfo: React.FC<{ values: any }> = ({ values }) => {
    const [currentFuneral] = useSelectedFuneral();
    const [savePersonalia] = useSavePersonalia();
    // const [saveInsurances] = useSaveInsurances();
    if (values && values['personalia']) {
        console.log('Values: ', values);
        savePersonalia({
            variables: {
                id: currentFuneral?.id || '',
                personalia: values['personalia']
            }
        }).then();
    }
    return (
        <PageTemplate title='Gegevens Overledene'>
            <Personalia />
            <Insurance />
        </PageTemplate>
    )
}