import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { LabelSelectField } from '../../../components/LabelSelectField';
import { LabelTextField } from '../../../components/LabelTextField';
import { FormProps } from '../../create/creation-framework';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { useGetLayOut } from './query/get-layOut';
import { useSaveLayOut } from './mutation/save-layOut';
import { Heading } from '../../../atoms/heading';
import { formatDate } from '../../../utils/date';

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
        if (initialValues) {
            setValues({
                layout: {
                    ...initialValues?.layOut,
                    // convert graphql to JS date
                    startingDate: formatDate(initialValues.layOut?.startingDate),
                    endDate: formatDate(initialValues.layOut?.endDate),

                },
                ...values
            });
        }
    }, [initialValues]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Opmaak
            </Heading>
            <Flex>
                <LabelSelectField id={wrapId("location")} label="Locatie" name="Locatie">
                    <option value="AfScheidshuis_Wouda">Afscheidshuis Wouda</option>
                    <option value="Uitvaarthuis_Purmerend">Uitvaarthuis Purmerend</option>
                    <option value="Uitvaartcentrum_Purmerend">Uitvaartcentrum Purmerend</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("address")} label="Adres" name="Adres">
                    <option value="Zwanebloem_1">Zwanebloem 1</option>
                    <option value="Doctor_J_M_den_Uyllaan_14_16">Doctor J.M. den Uyllaan 14-16</option>
                    <option value="Purmerendweg_94">Purmerendweg 94</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("postalCode")} label="Postcode" name="Postcode">
                    <option value="1441_TR">1441 TR</option>
                    <option value="1442_VS">1442 VS</option>
                    <option value="1441_RC">1441 RC</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("town")} label="Plaats" name="Plaats">
                    <option value="Purmerend">Purmerend</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("startingDate")} label="Aanvangsdatum" placeholder="13-12-1901" type="date" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("endDate")} label="Einddatum" placeholder="13-12-1901" type="date" />
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("typeOfLayout")} label="Type opbaring" name="Type opbaring">
                    <option value="Koeling">Koeling</option>
                    <option value="24_uurs_kamer">24 uurs kamer</option>
                    <option value="Bed">Bed</option>
                    <option value="In_kist">In kist</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("wayOfLayout")} label="Wijze van opbaren" name="Wijze van opbaren">
                    <option value="Kist">Kist</option>
                    <option value="Bed">Bed</option>
                    <option value="Opbaarplank">Opbaarplan</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("jewellery")} label="Aanwezige sieraden" />
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("cascetClosed")} label="Kist sluiten" name="Kist sluiten">
                    <option value="Kist">Kist</option>
                    <option value="Bed">Bed</option>
                    <option value="Opbaarplank">Opbaarplan</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("broughtBy")} label="Binnen gebracht door" />
            </Flex>
        </>
    );
};
