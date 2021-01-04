import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button, Flex } from 'rebass';
import { ProgressButton } from '../../../atoms/progress-button';
import { LabelTextField } from '../../../components/LabelTextField';
import { funeral_funeral } from '../../../utils/__generated__/funeral';
import { formatDate } from '../../../utils/date';
import { FormProps } from '../../create/creation-framework';
import { useGetAdvertisement } from './query/get-advertisement';
import { getAdvertisement_advertisement } from './query/__generated__/getAdvertisement';
import LabelTextAreaField from '../../../components/LabelTextAreaField';

const FORM_ID = 'advertisement';
const wrapId = (htmlId: string) => `${FORM_ID}.${htmlId}`;

export const AdvertisementInput: React.FC<FormProps & {
    arrayHelpers: any,
    selectedFuneral: funeral_funeral | null
}> = ({ values, arrayHelpers, setValues, selectedFuneral }) => {

    // initial values
    const { data: initialValues } = useGetAdvertisement({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (!initialValues) return;

        const advertisement = (initialValues.advertisement || []).map(it => ({
            ...it,
            date: formatDate(it.placementdate)
        }));

        const newValues: {
            advertisement: (getAdvertisement_advertisement[] | null)[],
            [key: string]: any
        } = {
            advertisement,
            ...values
        };

        setValues(newValues);
        newValues.advertisement?.forEach((it, index) => arrayHelpers.replace(index, it));

    }, [initialValues]);

    // Need to update this time discussion needed
    return (
        <>
            {values.advertisement && values.advertisement.length > 0 ? (
                values.advertisement.map((_: any, index: number) => (
                    <Flex key={index} mb={4} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }}>
                        <Flex p={4} flexGrow={1} flexDirection="column" alignItems="stretch">
                            <LabelTextField id={wrapId(`${index}.name`)} label="Naam krant" />
                            <LabelTextField id={wrapId(`${index}.edition`)} label="Editie" />
                            <LabelTextField id={wrapId(`${index}.columns`)} label="Aantal kolommen" />
                            <LabelTextAreaField id={wrapId(`${index}.detailswishes`)} label="Bijzonderheden/wensen" />
                            <LabelTextField id={wrapId(`${index}.placementdate`)} label="Plaatsingsdatum" placeholder="13-12-1901" type="date" />
                        </Flex>
                        <Flex flexGrow={0} alignItems="flex-start" style={{ position: 'relative' }}>
                            <Button
                                variant="icon"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                }}
                                onClick={() => arrayHelpers.remove(index)}
                            >
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
                Voeg advertentie toe
            </ProgressButton>
        </>
    );
};
