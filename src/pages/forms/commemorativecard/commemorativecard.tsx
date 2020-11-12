import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../../atoms/heading';
import LabelTextAreaField from '../../../components/LabelTextAreaField';
import { LabelTextField } from '../../../components/LabelTextField';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveCommemorativeCard } from './mutation/save-commemorativecard';
import { useCommemorativeCard } from './query/get-commemorativecard';

const wrapId = (htmlId: string) => `commemorativecard.${htmlId}`;

export const CommemorativeCard: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveCommemorativeCard] = useSaveCommemorativeCard();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveCommemorativeCard({
                variables: {
                    id: selectedFuneral.id,
                    commemorativecard: _.omit(values.commemorativecard, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useCommemorativeCard({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) setValues({ client: initialValues?.commemorativecard, ...values });
    }, [initialValues]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Gedachteniskaartjes
            </Heading>
            <Flex>
                <LabelTextField id={wrapId("type")} label="Soort" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("total")} label="Aantal" type="number" />
            </Flex>
            <Flex>
                <LabelTextAreaField id={wrapId("details")} label="Bijzonderheden" />
            </Flex>
        </>
    );
};
