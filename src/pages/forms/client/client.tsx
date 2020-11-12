import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../../atoms/heading';
import { LabelSelectField } from '../../../components/LabelSelectField';
import { LabelTextField } from '../../../components/LabelTextField';
import { FormProps } from '../../create/creation-framework';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { useSaveClient } from './mutation/save-client';
import { useGetClient } from './query/get-client'


const wrapId = (htmlId: string) => `client.${htmlId}`;

export const Client: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveClient] = useSaveClient();

    // savinga
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveClient({
                variables: {
                    id: selectedFuneral.id,
                    client: _.omit(values.client, ['__typename']),
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetClient({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues)
            setValues({ client: initialValues?.client, ...values });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    return (
        <>
            <Flex>
                <LabelTextField id={wrapId("firstname")} label="Voornaam" />
                <LabelTextField id={wrapId("firstLetters")} label="Voorletters" boxProps={{ ml: 2 }} />

            </Flex>
            <Flex>
                <LabelTextField id={wrapId("lastname")} label="Achternaam" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("girlname")} label="Meisjesnaam" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("callname")} label="Voorletters" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("gender")} label="Geslacht" name="geslacht">
                    <option value="man">Man</option>
                    <option value="vrouw">Vrouw</option>
                    <option value="non">Wil ik niet zeggen</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("address")} label="Adres" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("postal")} label="Postcode" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("town")} label="Plaats" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("dateOfBirth")} label="Geboortedatum" placeholder="13-12-1901" type='date' />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("phoneNumber")} label="Mobiel Telefoonnummer" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("emailAddress")} label="E-mail Adres" />
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("relation")} label="Relatie tot de overledene" name="relatie">
                    <option value="Echtgenoot">Echtgenoot</option>
                    <option value="Echtgenote">Echtgenote</option>
                    <option value="Partner">Partner</option>
                    <option value="Vriend">Vriend</option>
                    <option value="Vriendin">Vriendin</option>
                    <option value="Zoon">Zoon</option>
                    <option value="Dochter">Dochter</option>
                    <option value="Vader">Vader</option>
                    <option value="Moeder">Moeder</option>
                    <option value="Broer">Broer</option>
                    <option value="Zus">Zus</option>
                    <option value="Neef">Neef</option>
                    <option value="Nicht">Nicht</option>
                    <option value="Overig">Overig</option>
                </LabelSelectField>
            </Flex>
        </>
    );
};
