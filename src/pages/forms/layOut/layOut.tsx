import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { LabelSelectField } from '../../../components/LabelSelectField';
import { LabelTextField } from '../../../components/LabelTextField';
import { FormProps } from '../../create/creation-framework';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { useGetLayOut } from './query/get-layOut';
import { useSaveLayOut } from './mutation/save-layOut';

const wrapId = (htmlId: string) => `client.${htmlId}`;

export const layOut: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveLayOut] = useSaveLayOut();

    // savinga
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            useSaveLayOut({
                variables: {
                    id: selectedFuneral.id,
                    layOut: _.omit(values.layOut, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetLayOut();
    useEffect(() => {
        if (initialValues) setValues({ layOut: initialValues?.layOut, ...values });
    }, [initialValues]);

    return (
        <>
        </>
    );
};
