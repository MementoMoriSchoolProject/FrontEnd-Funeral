import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button, Flex } from 'rebass';
import { ProgressButton } from '../../../atoms/progress-button';
import { LabelTextField } from '../../../components/LabelTextField';
import { arrayToObject } from '../../../utils/array';
import { funeral_funeral } from '../../../utils/__generated__/funeral';
import { FormProps } from '../../create/creation-framework';
import { useGetVisiting } from './query/get-visiting';
import { LabelSelectField } from '../../../components/LabelSelectField';

const FORM_ID = 'visiting';
const wrapId = (htmlId: string) => `${FORM_ID}.${htmlId}`;

export const VisitingInput: React.FC<FormProps & {
    arrayHelpers: any,
    selectedFuneral: funeral_funeral | null
}> = ({ values, arrayHelpers, setValues, selectedFuneral }) => {

    // initial values
    const { data: initialValues } = useGetVisiting();
    useEffect(() => {
        if (!initialValues) return;

        // the API works with an array (which is okay), but formik
        // uses an object with numeric keys, so we have to convert between those 2
        const visitingObject = arrayToObject(initialValues.visiting || undefined);

        setValues({ visiting: visitingObject, ...values });

        // because we're using an ArrayHelper, we must also tell the array helper that we've received new values
        initialValues.visiting?.forEach((it: any, index: any) => arrayHelpers.replace(index, it));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    // Need to update this time discussion needed
    return (
        <>
            {values.visiting && values.visiting.length > 0 ? (
                values.visiting.map((_: any, index: number) => (
                    <Flex key={index} mb={4} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }}>
                        <Flex p={4} flexGrow={1} flexDirection='column' alignItems='stretch'>
                            <LabelTextField id={wrapId(`${index}.location`)} label="Locatie" />
                            <LabelTextField id={wrapId(`${index}.date`)} label="Datum" placeholder="13-12-1901" type='date'/>
                            <LabelSelectField id={wrapId(`${index}.kindOfVisit`)} label="Soort" name="Soort">
                                <option value="Familiebezoek">Familiebezoek</option>
                                <option value="Condoleancebezoek">Condoleancebezoek</option>
                            </LabelSelectField>
                            <LabelTextField id={wrapId(`${index}.timeOfArrival`)} label="Aanvangstijd" placeholder="13-12-1901" type='date' />
                            <LabelTextField id={wrapId(`${index}.timeOfLeave`)} label="Eindtijd" placeholder="13-12-1901" type='date'/>
                            <LabelTextField id={wrapId(`${index}.speicalNeeds`)} label="Bijzonderheden" />
                        </Flex>
                        <Flex flexGrow={0} alignItems='flex-start' style={{ position: 'relative' }}>
                            <Button variant='icon' style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            }} onClick={() => arrayHelpers.remove(index)}>
                                <FaTrash size={20} />
                            </Button>
                        </Flex>
                    </Flex>
                ))
            ) : (
                    <></>
                )}
            <ProgressButton
                onClick={() => arrayHelpers.push({})}
                mb={4}
                loading={false}
            >
                Voeg rouwbezoek toe
            </ProgressButton>
        </>
    )
}