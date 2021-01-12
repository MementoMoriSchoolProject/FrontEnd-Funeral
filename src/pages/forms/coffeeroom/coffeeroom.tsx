import _ from 'lodash';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { LabelSelectField } from '../../../components/LabelSelectField';
import { LabelTextField } from '../../../components/LabelTextField';
import { formatDate } from '../../../utils/date';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveCoffeeRoom } from './mutation/save-coffeeroom';
import { useGetCoffeeRoom } from './query/get-coffeeroom';

const wrapId = (htmlId: string) => `coffeeroom.${htmlId}`;

const specialcoffeeroom = "coffeeroom";

export const CoffeeRoom: React.FC<FormProps> = ({ shouldSubmit, setValues, values }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveCoffeeRoom] = useSaveCoffeeRoom();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            saveCoffeeRoom({
                variables: {
                    id: selectedFuneral.id,
                    coffeeroom: _.omit(values.coffeeroom, ['__typename']),
                }
            });
        }
    }, [shouldSubmit]);

    // initial values
    const { data: initialValues } = useGetCoffeeRoom({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (initialValues) {
            setValues({
                coffeeroom: {
                    ...initialValues?.coffeeroom,
                    // convert graphql to JS date
                    date: formatDate(initialValues.coffeeroom?.date)
                },
                ...values
            });
        }
    }, [initialValues]);

    return (
        <>
            <Flex>
                <LabelSelectField id={wrapId("usagecoffeeroom")} label="Gebruik koffiekamer" name="usagecoffeeroom">
                    <option value="restaurant">Restaurant</option>
                    <option value="crematorium">Crematorium</option>
                    <option value="begraafplaats">Begraafplaats</option>
                    <option value="elders">Elders</option>
                </LabelSelectField>
            </Flex>
            {values[specialcoffeeroom]?.usagecoffeeroom === "elders"
                ? (
                    <>
                        <Flex>
                            <LabelTextField id={wrapId("locationelsewhere")} label="Locatie koffiekamer indien elders" />
                        </Flex>
                        <Flex>
                            <LabelTextField id={wrapId("addresselsewhere")} label="Adres" />
                        </Flex>
                        <Flex>
                            <LabelTextField id={wrapId("postalelsewhere")} label="Postcode" />
                        </Flex>
                        <Flex>
                            <LabelTextField id={wrapId("placeelsewhere")} label="Plaats" />
                        </Flex>
                    </>
                ) : (
                    <></>
                )}
            <Flex>
                <LabelTextField id={wrapId("time")} type="time" label="Aanvang koffiekamer" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("extratime")} label="Koffiekamer extra tijd" type="number" boxProps={{ mr: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("amountpersons")} label="Aantal personen" type="number" boxProps={{ mr: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("amountreservations")} label="Aantal plaatsen reserveren voor familie" type="number" boxProps={{ mr: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("departuretime")} type="time" label="Vertrektijd condoleance" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("date")} label="Datum" placeholder="13-12-1901" type="date" />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("particularities")} label="Bijzonderheden" />
            </Flex>
        </>
    );
};
