import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { LabelSelectField } from '../../../components/LabelSelectField';
import { LabelTextField } from '../../../components/LabelTextField';
import { LocationInput } from '../../../components/LocationInput';
import { FormProps } from '../../create/creation-framework';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { useGetLayOut } from './query/get-layOut';
import { useSaveLayOut } from './mutation/save-layOut';

const wrapId = (htmlId: string) => `layOut.${htmlId}`;

export const layOut: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveLayOut] = useSaveLayOut();

    // savinga
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveLayOut({
                variables: {
                    id: selectedFuneral.id,
                    layOut: _.omit(values.layOut, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetLayOut({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) setValues({ layOut: initialValues?.layOut, ...values });
    }, [initialValues]);

    return (
        <>
            <Flex>
                <LabelSelectField id={wrapId("location")} label="Locatie" name="Locatie">
                    <option value="AfScheidshuis_Wouda">Afscheidshuis Wouda</option>
                    <option value="Uitvaarthuis_Purmerend">Uitvaarthuis Purmerend</option>
                    <option value="Uitvaartcentrum_Purmerend">Uitvaartcentrum Purmerend</option>
                </LabelSelectField>
            </Flex>
            <LocationInput id={values.layOut?.location} />
            <Flex>
                <LabelSelectField id={wrapId("gender")} label="Geslacht" name="geslacht">
                    <option value="man">Man</option>
                    <option value="vrouw">Vrouw</option>
                    <option value="non">Wil ik niet zeggen</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("postal")} label="Postcode" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("town")} label="Plaats" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("dateOfBirth")} label="Geboortedatum" placeholder="13-12-1901" type="date" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("phoneNumber")} label="Mobiel Telefoonnummer" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("emailAddress")} label="E-mail Adres" />
            </Flex>
        </>
    );
};
