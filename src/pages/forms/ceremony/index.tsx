import React, { useEffect } from 'react';
import { FieldArray } from 'formik';
import _ from 'lodash';
import { Button, Flex } from 'rebass';
import { LabelSelectField } from '../../../components/LabelSelectField';
import LabelTextAreaField from '../../../components/LabelTextAreaField';
import { LabelTextField } from '../../../components/LabelTextField';
import { ListItem } from '../../../molecules/list-item';
import { formatDate } from '../../../utils/date';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveCeremony } from './mutation/save-ceremony';
import { useGetCeremony } from './query/get-ceremony';
import { Text } from '../../../atoms/text';

const wrapId = (htmlId: string) => `ceremony.${htmlId}`;

export const Ceremony: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();

    const [saveCeremony] = useSaveCeremony();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveCeremony({
                variables: {
                    id: selectedFuneral.id,
                    ceremony: _.omit(values.ceremony, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetCeremony({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (!initialValues) return;
        setValues({
            ceremony: {
                ...initialValues?.ceremony,
                // convert graphql to JS date
                date: formatDate(initialValues.ceremony?.date)
            },
            ...values
        });
    }, [initialValues]);

    return (
        <>
            <Flex>
                <LabelTextField id={wrapId("date")} type="date" label="Datum uitvaart" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("time")} type="time" label="Tijdstip uitvaart" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelSelectField
                    id={wrapId("familyPresentAtLayoutAddress")}
                    label="Familie aanwezig bij opbaaradres"
                    name="familyPresentAtLayoutAddress"
                    boxProps={{ mr: 2 }}
                >
                    <option value="true">Ja</option>
                    <option value="false">Nee</option>
                </LabelSelectField>
                <LabelTextField id={wrapId("timeDepartureLayoutAddress")} type="time" label="Tijdstip vertrek opbaaradres" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField
                    id={wrapId("duration")}
                    type="time"
                    label="Duur plechtigheid"
                    boxProps={{ mr: 2 }}
                />
                <LabelTextField
                    id={wrapId("extraTime")}
                    type="time"
                    label="Aula extra tijd"
                    boxProps={{ ml: 2 }}
                />
            </Flex>
            <Flex>
                <LabelTextField
                    id={wrapId("aulaStart")}
                    type="time"
                    label="Aanvang Aula"
                    boxProps={{ mr: 2 }}
                />
                <LabelTextField id={wrapId("aulaType")} label="Soort aula" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField
                    id={wrapId("amountOfInterestedGuests")}
                    type="number"
                    label="Aantal belangstellenden"
                    boxProps={{ mr: 2 }}
                />
                <LabelSelectField
                    id={wrapId("isInClosedCircle")}
                    label="In besloten kring"
                    name="isInClosedCircle"
                    boxProps={{ ml: 2 }}
                >
                    <option value="true">Ja</option>
                    <option value="false">Nee</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("condolanceBook")} label="Condoleanceboek en/of kaartjes" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("attributesAtKatafalk")} label="Attributen bij katafalk" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelSelectField
                    id={wrapId("inviteSpeakers")}
                    label="Sprekers uitnodigen"
                    name="inviteSpeakers"
                    boxProps={{ mr: 2 }}
                >
                    <option value="true">Ja</option>
                    <option value="false">Nee</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("funeralAssistantAmount")} type="number" label="Aantal uitvaartassistenten" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("carrierAmount")} type="number" label="Aantal dragers" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("acceptFamily")} label="Ontvangst familie" />
            </Flex>
            <Flex>
                <LabelSelectField
                    id={wrapId("familyFirst")}
                    label="Familie eerste/laatste naar binnen"
                    name="acceptFamily"
                    boxProps={{ mr: 2 }}
                >
                    <option value="first">Eerste</option>
                    <option value="last">Laatste</option>
                    <option value="n/a">Niet van toepassing</option>
                </LabelSelectField>
                <LabelTextField id={wrapId("placesForFamilyAmount")} type="number" label="Aantal plaatsen voor familie" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("openingSpeech")} label="Welkomstwoord" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("candlesLitBy")} label="Kaarsen aangestoken door" boxProps={{ ml: 2 }} />
            </Flex>
            <FieldArray
                name="ceremony.speakers"
                render={arrayHelpers => {
                    const speakers: string[] = values.ceremony?.speakers;
                    return (
                        <Flex flexDirection="column" width="100%">
                            {speakers && speakers.length > 0 ? (
                                speakers.map((speaker, index) => (
                                    <ListItem key={index} onDelete={() => arrayHelpers.remove(index)}>
                                        <LabelTextField id={wrapId(`speakers.${index}`)} label={`Spreker ${index + 1}`} />
                                    </ListItem>
                                ))
                            ) : (
                                <Flex mb={4} justifyContent="center">
                                    <Text>
                                        Er zijn nog geen sprekers toegevoegd.
                                    </Text>
                                </Flex>
                            )}
                            <Button mb={4} onClick={() => arrayHelpers.push('')}>
                                Voeg spreker toe
                            </Button>
                        </Flex>
                    );
                }}
            />
            <Flex>
                <LabelSelectField
                    id={wrapId("momentOfSilence")}
                    label="Moment stilte"
                    name="momentOfSilence"
                    boxProps={{ mr: 2 }}
                >
                    <option value="true">Ja</option>
                    <option value="false">Nee</option>
                </LabelSelectField>
                <LabelSelectField
                    id={wrapId("closingSpeech")}
                    label="Slotwoord begeleider/familie"
                    name="closingSpeech"
                    boxProps={{ ml: 2 }}
                >
                    <option value="true">Ja</option>
                    <option value="false">Nee</option>
                </LabelSelectField>
            </Flex>
            <Flex>
                <LabelTextAreaField id={wrapId("flowerCardWishes")} label="Wensen m.b.t kaarten van de bloemen" />
            </Flex>
            <Flex>
                <LabelTextAreaField id={wrapId("flowerRibbonWishes")} label="Wensen m.b.t linten van de bloemen" />
            </Flex>
            <Flex>
                <LabelTextAreaField id={wrapId("flowerWishes")} label="Wensen m.b.t bloemenstukken" />
            </Flex>
            <Flex>
                <LabelTextAreaField id={wrapId("wishesh")} label="Bijzonderheden" />
            </Flex>
        </>
    );
};
