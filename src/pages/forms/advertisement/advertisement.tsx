import { FieldArray } from 'formik';
import React, { useEffect } from 'react';
import { Heading } from '../../../atoms/heading';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveAdvertisement } from './mutation/save-advertisement';
import { AdvertisementInput } from './advertisement-content';
import { objectToArray } from '../../../utils/array';
import { PersistAdvertisementInput } from '../../../../__generated__/globalTypes';

const FORM_ID = 'advertisement';

export const Advertisement: React.FC<FormProps> = ({ shouldSubmit, values, ...rest }) => {
    const [selectedFuneral] = useSelectedFuneral();

    // save
    const [saveAdvertisement] = useSaveAdvertisement();
    useEffect(() => {
        if (!shouldSubmit) return;

        // the API works with an array (which is okay), but formik
        // uses an object with numeric keys, so we have to convert between those 2
        const advertisementArray = objectToArray<PersistAdvertisementInput>(values.advertisement);

        saveAdvertisement({
            variables: {
                id: selectedFuneral?.id || '',
                advertisement: advertisementArray
            }
        });
    }, [shouldSubmit]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Advertentie
            </Heading>
            <FieldArray
                name={FORM_ID}
                render={arrayHelpers => (
                    <AdvertisementInput
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
