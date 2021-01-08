import { FieldArray } from 'formik';
import React, { useEffect } from 'react';
import { Heading } from '../../../atoms/heading';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveDrivingInfoFuneralCar } from './mutation/save-drivinginfofuneralcar';
import { DrivingInfoFuneralCarInput } from './drivinginfofuneralcar-content';
import { objectToArray } from '../../../utils/array';
import { PersistDrivingInfoFuneralCarInput } from '../../../../__generated__/globalTypes';

const FORM_ID = 'drivinginfofuneralcar';

export const DrivingInfoFuneralCar: React.FC<FormProps> = ({ shouldSubmit, values, ...rest }) => {
    const [selectedFuneral] = useSelectedFuneral();

    // save
    const [saveDrivingInfoFuneralCar] = useSaveDrivingInfoFuneralCar();
    useEffect(() => {
        if (!shouldSubmit) return;

        // the API works with an array (which is okay), but formik
        // uses an object with numeric keys, so we have to convert between those 2
        const drivingInfoFunferalCarArray = objectToArray<PersistDrivingInfoFuneralCarInput>(values.drivinginfofuneralcar);

        saveDrivingInfoFuneralCar({
            variables: {
                id: selectedFuneral?.id || '',
                drivinginfofuneralcar: drivingInfoFunferalCarArray
            }
        });
    }, [shouldSubmit]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Rijgegevens Rouwauto
            </Heading>
            <FieldArray
                name={FORM_ID}
                render={arrayHelpers => (
                    <DrivingInfoFuneralCarInput
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
