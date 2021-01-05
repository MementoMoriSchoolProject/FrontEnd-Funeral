import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button, Flex } from 'rebass';
import { ProgressButton } from '../../../atoms/progress-button';
import { LabelTextField } from '../../../components/LabelTextField';
import { funeral_funeral } from '../../../utils/__generated__/funeral';
import { FormProps } from '../../create/creation-framework';
import { useGetDrivingInfoFollowingCar } from './query/get-drivinginfofollowingcar';
import { getDrivingInfoFollowingCar_drivinginfofollowingcar } from './query/__generated__/getDrivingInfoFollowingCar';
import LabelTextAreaField from '../../../components/LabelTextAreaField';

const FORM_ID = 'drivinginfofollowingcar';
const wrapId = (htmlId: string) => `${FORM_ID}.${htmlId}`;

export const DrivingInfoFollowingCarInput: React.FC<FormProps & {
    arrayHelpers: any,
    selectedFuneral: funeral_funeral | null
}> = ({ values, arrayHelpers, setValues, selectedFuneral }) => {

    // initial values
    const { data: initialValues } = useGetDrivingInfoFollowingCar({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (!initialValues) return;

        const drivinginfofollowingcar = (initialValues.drivinginfofollowingcar || []).map(it => ({
            ...it,
            departuretime: it.departuretime
        }));

        const newValues: {
            drivinginfofollowingcar: (getDrivingInfoFollowingCar_drivinginfofollowingcar[] | null)[],
            [key: string]: any
        } = {
            drivinginfofollowingcar,
            ...values
        };

        setValues(newValues);
        newValues.drivinginfofollowingcar?.forEach((it, index) => arrayHelpers.replace(index, it));

    }, [initialValues]);

    // Need to update this time discussion needed
    return (
        <>
            {values.drivinginfofollowingcar && values.drivinginfofollowingcar.length > 0 ? (
                values.drivinginfofollowingcar.map((_: any, index: number) => (
                    <Flex key={index} mb={4} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }}>
                        <Flex p={4} flexGrow={1} flexDirection="column" alignItems="stretch">
                            <LabelTextField id={wrapId(`${index}.from`)} label="Van" />
                            <LabelTextField id={wrapId(`${index}.departuretime`)} label="Vertrektijd" />
                            <LabelTextField id={wrapId(`${index}.postalcode`)} label="Postcode" />
                            <LabelTextField id={wrapId(`${index}.hometown`)} label="Woonplaats" />
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
                Voeg route volgauto toe
            </ProgressButton>
        </>
    );
};
