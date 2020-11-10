import { FieldArray } from 'formik';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { Heading } from '../../../atoms/heading';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveInsurances } from './mutation/save-insurances';
import { InsuranceInput } from './insurance-content';
import { objectToArray } from '../../../utils/array';

const FORM_ID = 'insurances';

export const Insurance: React.FC<FormProps> = ({ shouldSubmit, values, ...rest }) => {
    const [selectedFuneral] = useSelectedFuneral();

    // save
    const [saveInsurances] = useSaveInsurances();
    useEffect(() => {
        if (!shouldSubmit) return;

        // the API works with an array (which is okay), but formik
        // uses an object with numeric keys, so we have to convert between those 2
        const insuranceArray = objectToArray(values.insurances);

        saveInsurances({
            variables: {
                id: selectedFuneral?.id || '',
                insurances: insuranceArray
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldSubmit]);

    return (
        <>
            <Heading level={2} mb={4}>
                Verzekering
            </Heading>
            <FieldArray
                name={FORM_ID}
                render={arrayHelpers => (
                    <InsuranceInput
                        selectedFuneral={selectedFuneral}
                        shouldSubmit={shouldSubmit}
                        values={values}
                        arrayHelpers={arrayHelpers}
                        {...rest}
                    />
                )}
            />
        </>
    );
};