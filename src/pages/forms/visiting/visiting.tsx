import { FieldArray } from 'formik';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { Heading } from '../../../atoms/heading';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveVisiting } from './mutation/save-visiting';
import { VisitingInput } from './visiting-content';
import { objectToArray } from '../../../utils/array';

const FORM_ID = 'visiting';

export const Visiting: React.FC<FormProps> = ({ shouldSubmit, values, ...rest }) => {
    const [selectedFuneral] = useSelectedFuneral();

    // save
    const [saveVisiting] = useSaveVisiting();
    useEffect(() => {
        if (!shouldSubmit) return;

        // the API works with an array (which is okay), but formik
        // uses an object with numeric keys, so we have to convert between those 2
        const visitingArray = objectToArray(values.visiting);

        saveVisiting({
            variables: {
                id: selectedFuneral?.id || '',
                visiting: visitingArray
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
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