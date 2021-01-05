import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../../atoms/heading';
import { LabelTextField } from '../../../components/LabelTextField';
import { FormProps } from '../../create/creation-framework';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { useSaveTransport } from './mutation/save-transport';
import { useGetTransport } from './query/get-transport';
import { LabelSelectField } from '../../../components/LabelSelectField';

const wrapId = (htmlId: string) => `transport.${htmlId}`;

export const Transport: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveTransport] = useSaveTransport();

    // savinga
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveTransport({
                variables: {
                    id: selectedFuneral.id,
                    transport: _.omit(values.transport, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetTransport({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) setValues({ client: initialValues?.transport, ...values });
    }, [initialValues]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Vervoer dag van de uitvaart
            </Heading>
            <Flex>
                <LabelSelectField id={wrapId("hearse")} label="Rouwauto" name="Rouwauto" boxProps={{ mr: 2 }}>
                    <option value="Ja">Ja</option>
                    <option value="Nee">Nee</option>
                </LabelSelectField>
                <LabelTextField id={wrapId("hearsecolor")} label="Kleur" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("numberoffollowcars")} label="Aantal volgauto's" type="number" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("numberoffollowcarscolor")} label="Kleur" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("numberofflowercars")} label="Aantal bloemenauto's" type="number" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("numberofflowercarscolor")} label="Kleur" boxProps={{ ml: 2 }} />
            </Flex>
        </>
    );
};
