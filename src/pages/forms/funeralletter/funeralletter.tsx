import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../../atoms/heading';
import LabelTextAreaField from '../../../components/LabelTextAreaField';
import { LabelTextField } from '../../../components/LabelTextField';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveFuneralLetter } from './mutation/save-funeralletter';
import { useFuneralLetter } from './query/get-funeralletter';

const wrapId = (htmlId: string) => `funeralletter.${htmlId}`;

export const FuneralLetter: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveFuneralLetter] = useSaveFuneralLetter();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveFuneralLetter({
                variables: {
                    id: selectedFuneral.id,
                    funeralletter: _.omit(values.funeralletter, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useFuneralLetter({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) setValues({ client: initialValues?.funeralletter, ...values });
    }, [initialValues]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Rouwbrief
            </Heading>
            <Flex>
                <LabelTextField id={wrapId("type")} label="Soort" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("total")} label="Aantal" type="number" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("numberOfPorti")} label="Aantal porti" type="number" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("numberOfShipments")} label="Aantal enveloppen voor verzending" type="number" />
            </Flex>
            <Flex>
                <LabelTextAreaField id={wrapId("details")} label="Bijzonderheden" />
            </Flex>
        </>
    );
};
