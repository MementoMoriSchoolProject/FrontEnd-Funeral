import { FieldArray } from 'formik';
import React, { useEffect } from 'react';
import { PersistTransmissionInput } from '../../../../__generated__/globalTypes';
import { Heading } from '../../../atoms/heading';
import { objectToArray } from '../../../utils/array';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveTransmissions } from './mutation/save-transmission';
import { TransmissionContent } from './transmission-content';

export const Transmission: React.FC<FormProps> = ({ shouldSubmit, setValues, values, ...rest }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveTransmission] = useSaveTransmissions();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {

            // the API works with an array (which is okay), but formik
            // uses an object with numeric keys, so we have to convert between those 2
            const transmissions = objectToArray<PersistTransmissionInput>(values.transmissions);

            saveTransmission({
                variables: {
                    id: selectedFuneral.id,
                    transmissions,
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldSubmit]);

    // console.log('Test: ', values.transmissions);
    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Transmission
            </Heading>
            <FieldArray
                name='transmissions'
                render={arrayHelpers => (
                    <TransmissionContent
                        selectedFuneral={selectedFuneral}
                        arrayHelpers={arrayHelpers}
                        shouldSubmit={shouldSubmit}
                        values={values}
                        setValues={setValues}
                        {...rest}
                    />
                )}
            />
        </>
    );
};