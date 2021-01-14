import React, { useEffect } from 'react';
import { FieldArray } from 'formik';
import _ from 'lodash';
import { Button, Flex } from 'rebass';
import { LabelTextField } from '../../../components/LabelTextField';
import { ListItem } from '../../../molecules/list-item';
import { formatDate } from '../../../utils/date';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveAppointments } from './mutation/save-appointment';
import { useGetAppointments } from './query/get-appointment';
import { Text } from '../../../atoms/text';
import { Heading } from '../../../atoms/heading';

const wrapId = (htmlId: string) => `appointments.${htmlId}`;

export const Appointment: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();

    const [saveAppointments] = useSaveAppointments();
    // saving
    useEffect(() => {

        if (shouldSubmit && selectedFuneral) {

            saveAppointments({
                variables: {
                    id: selectedFuneral.id,
                    appointments: _.omit(values.appointments, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetAppointments({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (!initialValues) return;
        setValues({
            appointments: {
                ...initialValues?.appointments,
                // convert graphql to JS date
                dateFinalCare: formatDate(initialValues.appointments?.dateFinalCare),
                dateConferenceContent: formatDate(initialValues.appointments?.dateConferenceContent),
                dateDeliveryCart: formatDate(initialValues.appointments?.dateDeliveryCart),
                dateDeliveryMusic: formatDate(initialValues.appointments?.dateDeliveryMusic),
                dateDeliveryPresentation: formatDate(initialValues.appointments?.dateDeliveryPresentation),
                extra: initialValues.appointments?.extra?.map(extraItem => {
                    const newItem = {
                        ...extraItem,
                        date: formatDate(extraItem.date)
                    };
                    return newItem;
                })
            },
            ...values
        });
    }, [initialValues]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Afspraken
            </Heading>
            <Flex mb="4" mx="auto">Laatste verzorging met familie</Flex>
            <Flex>
                <LabelTextField id={wrapId("dateFinalCare")} label="Datum" placeholder="13-12-1901" type="date" />
                <LabelTextField id={wrapId("timeFinalCare")} type="time" label="Tijdstip" placeholder="13-12-1901" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex mb="4" mx="auto">Bespreking inhoud dienst</Flex>
            <Flex>
                <LabelTextField id={wrapId("dateConferenceContent")} label="Datum" placeholder="13-12-1901" type="date" />
                <LabelTextField id={wrapId("timeConferenceContent")} type="time" label="Tijdstip" placeholder="13-12-1901" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex mb="4" mx="auto">Aanleveren tekst kaart</Flex>
            <Flex>
                <LabelTextField id={wrapId("dateDeliveryCart")} label="Datum" placeholder="13-12-1901" type="date" />
                <LabelTextField id={wrapId("timeDeliveryCart")} type="time" label="Tijdstip" placeholder="13-12-1901" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex mb="4" mx="auto">Aanleveren muziek</Flex>
            <Flex>
                <LabelTextField id={wrapId("dateDeliveryMusic")} label="Datum" placeholder="13-12-1901" type="date" />
                <LabelTextField id={wrapId("timeDeliveryMusic")} type="time" label="Tijdstip" placeholder="13-12-1901" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex mb="4" mx="auto">Aanleveren powerpoint-presentatie</Flex>
            <Flex>
                <LabelTextField id={wrapId("dateDeliveryPresentation")} label="Datum" placeholder="13-12-1901" type="date" />
                <LabelTextField id={wrapId("timeDeliveryPresentation")} type="time" label="Tijdstip" placeholder="13-12-1901" boxProps={{ ml: 2 }} />
            </Flex>
            <FieldArray
                name="appointments.extra"
                render={arrayHelpers => {
                    const extra: string[] = values.appointments?.extra;
                    return (
                        <Flex flexDirection="column" width="100%">
                            {extra && extra.length > 0 ? (
                                extra.map((_1, index) => (
                                    <ListItem key={index} onDelete={() => arrayHelpers.remove(index)}>
                                        <LabelTextField id={wrapId(`extra.${index}.description`)} label={`Extra afspraak ${index + 1}`} />
                                        <LabelTextField id={wrapId(`extra.${index}.date`)} label="Datum" placeholder="13-12-1901" type="date" />
                                        <LabelTextField id={wrapId(`extra.${index}.time`)} type="time" label="Tijdstip" placeholder="13-12-1901" boxProps={{ ml: 2 }} />
                                    </ListItem>
                                ))
                            ) : (
                                <Flex mb={4} justifyContent="center">
                                    <Text>
                                        Er zijn geen extra afspraken toegevoegd.
                                    </Text>
                                </Flex>
                            )}
                            <Button mb={4} onClick={() => arrayHelpers.push({})}>
                                Voeg extra afspraak toe
                            </Button>
                        </Flex>
                    );
                }}
            />
        </>
    );
};
