import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { LabelTextField } from '../../../components/LabelTextField';
import { LabelSelectField } from '../../../components/LabelSelectField';
import { FormProps } from '../../create/creation-framework';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { useGetCascet } from './query/get-cascet';
import { useSaveCascet } from './mutation/save-cascet';
import { Heading } from '../../../atoms/heading';

const wrapId = (htmlId: string) => `cascet.${htmlId}`;

export const Cascet: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveCascet] = useSaveCascet();

    // savinga
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveCascet({
                variables: {
                    id: selectedFuneral.id,
                    cascet: _.omit(values.cascet, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetCascet({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) setValues({ cascet: initialValues?.cascet, ...values });
    }, [initialValues]);

    return (
        <>
            <Flex justifyContent="center" mb={3}>
                <Heading level={1}>Kist</Heading>
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("model")} label="Model" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("length")} label="Lengte" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("width")} label="Breedte" />
            </Flex>
            <Flex>
                <LabelSelectField
                    id={wrapId("cross")}
                    label="Kruisje"
                    name="cross"
                    boxProps={{ mr: 2 }}
                >
                    <option value="Yes">Ja</option>
                    <option value="No">Nee</option>
                    <option value="Does not apply">Niet van toepassing</option>

                </LabelSelectField>
            </Flex>
        </>
    );
};
