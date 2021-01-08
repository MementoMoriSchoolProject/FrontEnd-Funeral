import { FieldArray } from 'formik';
import React, { useEffect } from 'react';
import { Heading } from '../../../atoms/heading';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveDrivingInfoFollowingCar } from './mutation/save-drivinginfofollowingcar';
import { DrivingInfoFollowingCarInput } from './drivinginfofollowingcar-content';
import { objectToArray } from '../../../utils/array';
import { PersistDrivingInfoFollowingCarInput } from '../../../../__generated__/globalTypes';

const FORM_ID = 'drivinginfofollowingcar';

export const DrivingInfoFollowingCar: React.FC<FormProps> = ({ shouldSubmit, values, ...rest }) => {
    const [selectedFuneral] = useSelectedFuneral();

    // save
    const [saveDrivingInfoFollowingCar] = useSaveDrivingInfoFollowingCar();
    useEffect(() => {
        if (!shouldSubmit) return;

        // the API works with an array (which is okay), but formik
        // uses an object with numeric keys, so we have to convert between those 2
        const drivingInfoFollowingCarArray = objectToArray<PersistDrivingInfoFollowingCarInput>(values.drivinginfofollowingcar);

        saveDrivingInfoFollowingCar({
            variables: {
                id: selectedFuneral?.id || '',
                drivinginfofollowingcar: drivingInfoFollowingCarArray
            }
        });
    }, [shouldSubmit]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Rijgegevens Volgauto
            </Heading>
            <FieldArray
                name={FORM_ID}
                render={arrayHelpers => (
                    <DrivingInfoFollowingCarInput
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
