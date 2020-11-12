import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../../atoms/heading';
import { LabelTextField } from '../../../components/LabelTextField';
import { FormProps } from '../../create/creation-framework';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { useSaveNightguard } from './mutation/save-nightguard';
import { useGetNightguard } from './query/get-nightguard';
import { formatDate } from '../../../utils/date';

const wrapId = (htmlId: string) => `nightguard.${htmlId}`;

export const Nightguard: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveNightguard] = useSaveNightguard();

    // savinga
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveNightguard({
                variables: {
                    id: selectedFuneral.id,
                    nightguard: _.omit(values.nightguard, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetNightguard({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) {
            setValues({
                nightguard: {
                    ...initialValues?.nightguard,
                    // convert graphql to JS date
                    date: formatDate(initialValues.nightguard?.date),
                    time: formatDate(initialValues.nightguard?.time)

                },
                ...values
            });
        }
    }, [initialValues]);
    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Avondwake
            </Heading>
            <Flex>
                <LabelTextField id={wrapId("location")} label="Locatie" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("date")} label="Datum" placeholder="13-12-1901" type="date" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("time")} label="Tijd" type="time" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("predecessor")} label="Voorganger" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("specialNeeds")} label="Bijzonderheden" boxProps={{ ml: 2 }} />
            </Flex>
        </>
    );
};