import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../../atoms/heading';
import { LabelSelectField } from '../../../components/LabelSelectField';
import { LabelTextField } from '../../../components/LabelTextField';
import { formatDate } from '../../../utils/date';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSavePersonalia } from './mutation/save-personalia';
import { useGetPersonalia } from './query/get-personalia';

const wrapId = (htmlId: string) => `personalia.${htmlId}`;

export const Personalia: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [savePersonalia] = useSavePersonalia();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            savePersonalia({
                variables: {
                    id: selectedFuneral.id,
                    personalia: _.omit(values.personalia, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetPersonalia({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) {
            setValues({
                personalia: {
                    ...initialValues?.personalia,
                    // convert graphql to JS date
                    dateOfBirth: formatDate(initialValues.personalia?.dateOfBirth)
                },
                ...values
            });
        }
    }, [initialValues]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Personalia
            </Heading>
            <Flex>
                <LabelTextField id={wrapId("firstname")} label="Voornaam" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("lastname")} label="Achternaam" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("girlname")} label="Meisjesnaam" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("callname")} label="Roepnaam" />
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("title")} label="Titelactuur" name="titelactuur">
                    <option value="deheer">De heer</option>
                    <option value="mevrouw">Mevrouw</option>
                </LabelSelectField>
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
                <LabelTextField id={wrapId("bsn")} label="BSN" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("dateOfBirth")} label="Geboortedatum" placeholder="13-12-1901" type="date" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("amountOfChildren")} label="Aantal Kinderen" type="number" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("amountOfMinors")} label="Aantal minderjarig" type="number" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("maritalStatus")} label="Burgelijke Staat" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("religion")} label="Geloofsovertuiging" />
            </Flex>
        </>
    );
};
