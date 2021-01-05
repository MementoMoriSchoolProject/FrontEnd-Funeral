import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button, Flex } from 'rebass';
import { ProgressButton } from '../../../atoms/progress-button';
import { LabelTextField } from '../../../components/LabelTextField';
import { funeral_funeral } from '../../../utils/__generated__/funeral';
import { FormProps } from '../../create/creation-framework';
import { useGetDrivingInfoFuneralCar } from './query/get-drivinginfofuneralcar';
import { getDrivingInfoFuneralCar_drivinginfofuneralcar } from './query/__generated__/getDrivingInfoFuneralCar';
import LabelTextAreaField from '../../../components/LabelTextAreaField';

const FORM_ID = 'drivinginfofuneralcar';
const wrapId = (htmlId: string) => `${FORM_ID}.${htmlId}`;

export const DrivingInfoFuneralCarInput: React.FC<FormProps & {
    arrayHelpers: any,
    selectedFuneral: funeral_funeral | null
}> = ({ values, arrayHelpers, setValues, selectedFuneral }) => {

    // initial values
    const { data: initialValues } = useGetDrivingInfoFuneralCar({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (!initialValues) return;

        const drivinginfofuneralcar = (initialValues.drivinginfofuneralcar || []).map(it => ({
            ...it,
            departuretime: it.departuretime
        }));

        const newValues: {
            drivinginfofuneralcar: (getDrivingInfoFuneralCar_drivinginfofuneralcar[] | null)[],
            [key: string]: any
        } = {
            drivinginfofuneralcar,
            ...values
        };

        setValues(newValues);
        newValues.drivinginfofuneralcar?.forEach((it, index) => arrayHelpers.replace(index, it));

    }, [initialValues]);

    // Need to update this time discussion needed
    return (
        <>
            {values.drivinginfofuneralcar && values.drivinginfofuneralcar.length > 0 ? (
                values.drivinginfofuneralcar.map((_: any, index: number) => (
                    <Flex key={index} mb={4} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }}>
                        <Flex p={4} flexGrow={1} flexDirection="column" alignItems="stretch">
                            <LabelTextField id={wrapId(`${index}.from`)} label="Van" />
                            <LabelTextField id={wrapId(`${index}.departuretime`)} label="Vertrektijd" />
                            <LabelTextField id={wrapId(`${index}.to`)} label="Naar" />
                            <LabelTextField id={wrapId(`${index}.arrivaltime`)} label="Aankomsttijd" />
                            <LabelTextField id={wrapId(`${index}.specialroute`)} label="Speciale route" />
                            <LabelTextAreaField id={wrapId(`${index}.details`)} label="Bijzonderheden" />
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
                Voeg route rouwauto toe
            </ProgressButton>
        </>
    );
};
