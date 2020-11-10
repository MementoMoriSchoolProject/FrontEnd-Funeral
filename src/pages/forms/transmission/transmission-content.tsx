import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { LabelTextField } from '../../../components/LabelTextField';
import { FormArrayProps } from '../../create/creation-framework';
import { useGetTransmissions } from './query/get-transmission';

const wrapId = (htmlId: string) => `transmission.${htmlId}`;

export const TransmissionContent: React.FC<FormArrayProps> = ({ setValues, values, selectedFuneral, arrayHelpers }) => {

    // initial values
    const { data: initialValues } = useGetTransmissions({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (!initialValues) return;
            const transmissionsObject = {...(initialValues.transmissions || [])};

            setValues({ transmissions: transmissionsObject, ...values });

            initialValues.transmissions?.forEach((it, index) => arrayHelpers.replace(index, it));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    return (
        <>
            {values.transmissions && values.transmissions.length > 0 ? (
                values.transmissions.map((_: any, index: number) => (
                    <>
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
                    </>
                ))
            ) : (<></>)}
        </>
    );
}