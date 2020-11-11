import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button, Flex } from 'rebass';
import { ProgressButton } from '../../../atoms/progress-button';
import { LabelTextField } from '../../../components/LabelTextField';
import { formatDate } from '../../../utils/date';
import { FormArrayProps } from '../../create/creation-framework';
import { useGetTransmissions } from './query/get-transmission';
import { getTransmissions_transmissions } from './query/__generated__/getTransmissions';

const wrapId = (htmlId: string) => `transmissions.${htmlId}`;

export const TransmissionContent: React.FC<FormArrayProps> = ({ setValues, values, selectedFuneral, arrayHelpers }) => {

    // initial values
    const { data: initialValues } = useGetTransmissions({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (!initialValues) return;

        let transmissions = (initialValues.transmissions || []).map(it => ({
            ...it,
            date: formatDate(it.date)
        }));

        const newValues: {
            transmissions: (getTransmissions_transmissions[] | null)[],
            [key: string]: any
        } = {
            transmissions,
            ...values
        };

        setValues(newValues);
        newValues.transmissions?.forEach((it, index) => arrayHelpers.replace(index, it));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    return (
        <>
            {values.transmissions && values.transmissions.length > 0 ? (
                values.transmissions.map((_: any, index: number) => (
                    <Flex key={index} variant='highCard' mb={4}>
                        <Flex p={4} flexGrow={1} flexDirection='column' alignItems='stretch'>
                            <Flex>
                                <LabelTextField id={wrapId(`${index}.date`)} label="Datum" placeholder="13-12-1901" type='date' />
                            </Flex>
                            <Flex>
                                <LabelTextField id={wrapId(`${index}.by`)} label="Door" />
                            </Flex>
                            <Flex>
                                <LabelTextField id={wrapId(`${index}.from`)} label="Van" boxProps={{ mr: 2 }} />
                                <LabelTextField id={wrapId(`${index}.to`)} label="Naar" boxProps={{ ml: 2 }} />
                            </Flex>
                            <Flex>
                                <LabelTextField id={wrapId(`${index}.fromAddress`)} label="Adres" boxProps={{ mr: 2 }} />
                                <LabelTextField id={wrapId(`${index}.toAddress`)} label="Adres" boxProps={{ ml: 2 }} />
                            </Flex>
                            <Flex>
                                <LabelTextField id={wrapId(`${index}.fromPlace`)} label="Plaats" boxProps={{ mr: 2 }} />
                                <LabelTextField id={wrapId(`${index}.toPlace`)} label="Plaats" boxProps={{ ml: 2 }} />
                            </Flex>
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
            ) : (<></>)}
            <ProgressButton
                loading={false}
                mb={4}
                onClick={() => arrayHelpers.push({})}
            >
                Voeg tussentijds vervoer toe
            </ProgressButton>
        </>
    );
}