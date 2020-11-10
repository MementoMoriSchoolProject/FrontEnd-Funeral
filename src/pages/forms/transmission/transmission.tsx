import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../../atoms/heading';
import { LabelSelectField } from '../../../components/LabelSelectField';
import { LabelTextField } from '../../../components/LabelTextField';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveTransmission } from './mutation/save-transmission';
import { useGetTransmission } from './query/get-transmission';

const wrapId = (htmlId: string) => `transmission.${htmlId}`;

export const Transmission: React.FC<FormProps> = ({ shouldSubmit, setValues, values, setFieldValue }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveTransmission] = useSaveTransmission();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveTransmission({
                variables: {
                    id: selectedFuneral.id,
                    transmission: _.omit(values.transmission, ['__typename']),
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetTransmission({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues)
            setValues({
                transmission: {
                    ...initialValues?.transmission,
                    // convert graphql to JS date
                    date: initialValues.transmission?.date ? new Date(initialValues.transmission?.date).toISOString().substring(0, 10) : null
                },
                ...values
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Transmission
            </Heading>
            <Flex>
                <LabelTextField id={wrapId("date")} label="Datum" placeholder="13-12-1901" type='date' />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("by")} label="Door" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("from")} label="Van" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("to")} label="Naar" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("fromAddress")} label="Adres" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("toAddress")} label="Adres" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("fromPlace")} label="Plaats" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("toPlace")} label="Plaats" boxProps={{ ml: 2 }} />
            </Flex>
        </>
    );
};