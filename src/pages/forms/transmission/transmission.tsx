import { FieldArray } from 'formik';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { Heading } from '../../../atoms/heading';
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
            saveTransmission({
                variables: {
                    id: selectedFuneral.id,
                    transmissions: Object.values(_.omit(values.transmission, ['__typename'])),
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldSubmit]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Transmission
            </Heading>
            <FieldArray
                name='transmission'
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