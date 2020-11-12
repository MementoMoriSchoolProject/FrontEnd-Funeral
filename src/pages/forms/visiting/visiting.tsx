import { FieldArray } from 'formik';
import React, { useEffect } from 'react';
import { Heading } from '../../../atoms/heading';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveVisiting } from './mutation/save-visiting';
import { VisitingInput } from './visiting-content';
import { objectToArray } from '../../../utils/array';
import { PersistVisitingInput } from '../../../../__generated__/globalTypes';

const FORM_ID = 'visiting';

export const Visiting: React.FC<FormProps> = ({ shouldSubmit, values, ...rest }) => {
    const [selectedFuneral] = useSelectedFuneral();

    // save
    const [saveVisiting] = useSaveVisiting();
    useEffect(() => {
        if (!shouldSubmit) return;

        // the API works with an array (which is okay), but formik
        // uses an object with numeric keys, so we have to convert between those 2
        const visitingArray = objectToArray<PersistVisitingInput>(values.insurances);

        saveVisiting({
            variables: {
                id: selectedFuneral?.id || '',
                visiting: visitingArray
            }
        });
    }, [shouldSubmit]);

    return (
        <>
            <Heading level={2} mb={4}>
                Bezoek
            </Heading>
            <FieldArray
                name={FORM_ID}
                render={arrayHelpers => (
                    <VisitingInput
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
