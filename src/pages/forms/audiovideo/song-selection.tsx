import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button, Flex } from 'rebass';
import { ProgressButton } from '../../../atoms/progress-button';
import { LabelTextField } from '../../../components/LabelTextField';
import { FormArrayProps } from '../../create/creation-framework';
import { useGetAudioVideo } from './query/get-audiovideo';

const FORM_ID = 'audioVideo';

const wrapId = (htmlId: string) => `${FORM_ID}.${htmlId}`;

export const SongSelection: React.FC<FormArrayProps> = ({ values, arrayHelpers, setValues, selectedFuneral }) => {
    const { data: initialValues } = useGetAudioVideo({ id: selectedFuneral?.id || '' });
    useEffect(() => {
        if (!initialValues) return;

        setValues({
            audiovideo: {
                songs: initialValues.audioVideo?.songs
            },
            ...values
        });

        initialValues.audioVideo?.songs?.forEach((it, index) => arrayHelpers.replace(index, it));
    }, [initialValues]);

    return (
        <>
            {values[FORM_ID]?.songs && values[FORM_ID].songs?.length > 0 ? (
                values[FORM_ID].songs.map((_: any, index: number) => (
                    <Flex key={index} mb={4} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }}>
                        <Flex p={4} flexGrow={1} flexDirection="column" alignItems="stretch">
                            <LabelTextField id={wrapId(`songs.${index}.title`)} label="Titel" />
                            <LabelTextField id={wrapId(`songs.${index}.artist`)} label="Artiest" />
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
                Voeg nummer toe
            </ProgressButton>
        </>
    );
};
