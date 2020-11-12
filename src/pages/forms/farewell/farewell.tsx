import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { LabelSelectField } from '../../../components/LabelSelectField';
import LabelTextAreaField from '../../../components/LabelTextAreaField';
import { LabelTextField } from '../../../components/LabelTextField';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveFarewell } from './mutation/save-farewell';
import { useFarewell } from './query/get-farewell';

const wrapId = (htmlId: string) => `farewell.${htmlId}`;

export const Farewell: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveFarewell] = useSaveFarewell();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveFarewell({
                variables: {
                    id: selectedFuneral.id,
                    farewell: _.omit(values.farewell, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useFarewell({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) setValues({ client: initialValues?.farewell, ...values });
    }, [initialValues]);

    return (
        <>
            <Flex>
                <LabelTextField id={wrapId("pastor")} label="Voorganger" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("location")} label="Naam locatie" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("address")} label="Adres" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("postalCode")} label="Postcode" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("place")} label="Naam locatie" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("date")} label="Datum" placeholder="13-12-1901" type="date" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("startTime")} label="Aanvangstijd dienst" />
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("carrying")} label="Binnen- en buitendragen bij afscheidsdienst door">
                    <option value="familie">Familie</option>
                    <option value="dragers">Dragers</option>
                    <option value="vrienden">Vrienden</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("numberOfCarriers")} label="Aantal dragers" type="number" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("parkingSpaces")} label="Aantal te reserveren parkeerplaatsen bij afscheidsdienst" type="number" />
            </Flex>
            <Flex>
                <LabelTextAreaField id={wrapId("details")} label="Bijzonderheden" />
            </Flex>
        </>
    );
};
