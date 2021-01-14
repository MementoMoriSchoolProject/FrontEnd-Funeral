import React, { useEffect } from 'react';
import { FieldArray } from 'formik';
import _ from 'lodash';
import { Button, Flex } from 'rebass';
import { LabelTextField } from '../../../components/LabelTextField';
import { ListItem } from '../../../molecules/list-item';
import { formatDate } from '../../../utils/date';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { Text } from '../../../atoms/text';
import { useSaveFlowers } from './mutation/save-flowers';
import { useGetFlowers } from './query/get-flowers';
import { ListItemNoIcon } from '../../../molecules/list-item-no-icon';
import { Heading } from '../../../atoms/heading';

const wrapId = (htmlId: string) => `flowers.${htmlId}`;

export const Flowers: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();

    const [saveFlowers] = useSaveFlowers();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveFlowers({
                variables: {
                    id: selectedFuneral.id,
                    flowers: _.omit(values.flowers, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetFlowers({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (!initialValues) return;
        setValues({
            flowers: {
                ...initialValues?.flowers,
                // convert graphql to JS date
                deliveryDate: formatDate(initialValues.flowers?.deliveryDate)
            },
            ...values
        });
    }, [initialValues]);

    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Bloemen
            </Heading>
            <Flex>
                <LabelTextField id={wrapId("supplier")} label="Leverancier" boxProps={{ mr: 2 }} />
            </Flex>
            <FieldArray
                name="flowers.flowers"
                render={arrayHelpers => {
                    const flowers: Object[] = values.flowers?.flowers;
                    return (
                        <Flex flexDirection="column" width="100%">
                            {flowers && flowers.length > 0 ? (
                                flowers.map((flower, index) => (
                                    <>
                                        <ListItem key={index} onDelete={() => arrayHelpers.remove(index)}>
                                            <Heading level={2} mb={4}>{`Rouwboeket ${index + 1}`}</Heading>
                                        </ListItem>
                                        <ListItemNoIcon key={index}>
                                            <LabelTextField id={wrapId(`flowers.${index}.formatting`)} label="Model / opmaak rouwboeket" />
                                        </ListItemNoIcon>
                                        <ListItemNoIcon key={index}>
                                            <LabelTextField id={wrapId(`flowers.${index}.textOnLint1`)} label="Tekst op lint 1" />
                                        </ListItemNoIcon>
                                        <ListItemNoIcon key={index}>
                                            <LabelTextField id={wrapId(`flowers.${index}.textOnLint2`)} label="Tekst op lint 2" />
                                        </ListItemNoIcon>
                                        <ListItemNoIcon key={index}>
                                            <LabelTextField id={wrapId(`flowers.${index}.colorOnLint`)} label="Kleur lint / kleur letters" />
                                        </ListItemNoIcon>
                                        <ListItemNoIcon key={index}>
                                            <LabelTextField id={wrapId(`flowers.${index}.costFlower`)} type="number"
                                                label="Bedrag rouwboeket"
                                            />
                                        </ListItemNoIcon>
                                    </>
                                ))
                            ) : (
                                <Flex mb={4} justifyContent="center">
                                    <Text>
                                        Er zijn nog geen bloemen toegevoegd
                                    </Text>
                                </Flex>
                            )}
                            <Button mb={4} onClick={() => arrayHelpers.push({})}>
                                Voeg bloemen toe
                            </Button>
                        </Flex>
                    );
                }}
            />
            <Flex>
                <LabelTextField id={wrapId("deliveryDate")} type="date" label="Leverdatum" boxProps={{ mr: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("finalTime")} type="time" label="Uiterlijk voor (tijdstip)" boxProps={{ ml: 2 }} />
            </Flex>
            <LabelTextField
                id={wrapId("totalcost")}
                type="number"
                label="Totaal bedrag"
                boxProps={{ mr: 2 }}
            />
            <Flex>
                <LabelTextField id={wrapId("deliveryLocation")} label="Afleverlocatie" boxProps={{ mr: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("adress")} label="Adres" boxProps={{ mr: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("postalCode")} label="Postcode" boxProps={{ mr: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("location")} label="Plaats" boxProps={{ mr: 2 }} />
            </Flex>
        </>
    );
};
