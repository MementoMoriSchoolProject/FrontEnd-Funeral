import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../../atoms/heading';
import { LabelTextField } from '../../../components/LabelTextField';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveCircumstances } from './mutation/save-circumstances';
import { useGetCircumstances } from './query/get-circumstances';

const wrapId = (htmlId: string) => `circumstances.${htmlId}`;

export const Circumstances: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();

    // saving values
    const [saveCircumstances] = useSaveCircumstances();
    useEffect(() => {
        if (!shouldSubmit) return;
        saveCircumstances({
            variables: {
                id: selectedFuneral?.id || '',
                circumstances: _.omit(values.circumstances, '__typename'),
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetCircumstances({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (!initialValues) return;
        setValues({
            circumstances: {
                ...initialValues.circumstances,
                // convert graphql to JS date
                date: initialValues.circumstances?.date ? new Date(initialValues.circumstances?.date).toISOString().substring(0, 10) : null
            },
            ...values,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);
    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Overlijden
            </Heading>
            <Flex>
                <LabelTextField id={wrapId("date")} type='date' label="Datum" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("time")} type='time' label="Tijdstip" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("address")} label="Adres" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("postal")} label="Postcode" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("town")} label="Plaats" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("cause")} label="Doodsoorzaak" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("reasonForProcrastination")} label="Reden Uitstel" />
            </Flex>
        </>
    );
}