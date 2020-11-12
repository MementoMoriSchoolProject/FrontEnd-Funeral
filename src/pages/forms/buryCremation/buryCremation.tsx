import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { LabelSelectField } from '../../../components/LabelSelectField';
import { LabelTextField } from '../../../components/LabelTextField';
import { FormProps } from '../../create/creation-framework';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { useSaveBuryCremation } from './mutation/save-buryCremation';
import { useGetBuryCremation } from './query/get-buryCremation';
import { formatDate } from '../../../utils/date';

const wrapId = (htmlId: string) => `burycremation.${htmlId}`;

export const BuryCremation: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveBuryCremation] = useSaveBuryCremation();

    // savinga
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveBuryCremation({
                variables: {
                    id: selectedFuneral.id,
                    burycremation: _.omit(values.burycremation, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetBuryCremation({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) {
            setValues({
                burycremation: {
                    ...initialValues?.buryCremation,
                    // convert graphql to JS date
                    date: formatDate(initialValues.buryCremation?.date),
                },
                ...values
            });
        }
    }, [initialValues]);

    return (
        <>
            <Flex>
                <LabelSelectField id={wrapId("buryCremation")} label="Begraven of Cremeren" name="Begraven of Cremeren">
                    <option value="Bury">Begraven</option>
                    <option value="Cremation">Cremeren</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("date")} label="Datum" placeholder="13-12-1901" type="date" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("timeOfArrival")} label="Tijdstip/aanvang" type="time" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("namePlace")} label="Naam Locatie" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("address")} label="Adres" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("postal")} label="Postcode" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("location")} label="Plaats" />
            </Flex>
            <Flex>
                <LabelSelectField id={wrapId("speakerOrder")} label="Volgorde afscheid" name="volgorde afscheid">
                    <option value="familyFirst">Familie als eerste</option>
                    <option value="familyLast">Familie als laatste</option>
                </LabelSelectField>
            </Flex>
            {values.burycremation?.buryCremation === 'Bury' ? (
                <>
                    <Flex>
                        <LabelSelectField id={wrapId("kindOfGrave")} label="Soort graf" name="soort graf">
                            <option value="common">Algemeen</option>
                            <option value="family">Familie</option>
                        </LabelSelectField>
                    </Flex>
                    <Flex>
                        <LabelSelectField id={wrapId("existingGrave")} label="Bestaand graf" name="bestaand graf">
                            <option value="yes">Ja</option>
                            <option value="no">Nee</option>
                        </LabelSelectField>
                    </Flex>
                    <Flex>
                        <LabelTextField id={wrapId("sectionNumber")} label="Vak/nummer" />
                    </Flex>
                    <Flex>
                        <LabelTextField id={wrapId("burriedRecently")} label="Reeds begraven" />
                    </Flex>
                    <Flex>
                        <LabelSelectField id={wrapId("cascetDescend")} label="Kist dalen" name="kist dalen">
                            <option value="familyOnly">Alleen met familie</option>
                            <option value="familyWithFriends">Samen met belangstellenden</option>
                            <option value="no">Nee</option>
                        </LabelSelectField>
                    </Flex>
                    <Flex>
                        <LabelTextField id={wrapId("stonemason")} label="Steenhouwer" />
                    </Flex>
                </>
            ) : (
                <>
                    <Flex>
                        <LabelSelectField id={wrapId("insertion")} label="Volgorde afscheid" name="volgorde afscheid">
                            <option value="withFamily">Met familie</option>
                            <option value="withoutFamily">Zonder familie</option>
                        </LabelSelectField>
                    </Flex>
                    <Flex>
                        <LabelSelectField id={wrapId("cascetView")} label="Baar aan zicht onttrekken" name="volgorde afscheid">
                            <option value="familyOnly">Alleen met familie</option>
                            <option value="familyWithFriends">Samen met belangstellenden</option>
                            <option value="no">Nee</option>
                        </LabelSelectField>
                    </Flex>
                    <Flex>
                        <LabelTextField id={wrapId("ashesDestination")} label="Asbestemming" />
                    </Flex>
                </>
            )}
            <Flex>
                <LabelTextField id={wrapId("specialNeeds")} label="Bijzonderheden" />
            </Flex>
        </>
    );
};
