import { FieldArray } from 'formik';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../../atoms/heading';
import { LabelTextField } from '../../../components/LabelTextField';
import { objectToArray } from '../../../utils/array';
import { useSelectedFuneral } from '../../../utils/selected-funeral';
import { FormProps } from '../../create/creation-framework';
import { useSaveAudioVideo } from './mutation/save-audiovideo';
import { SongSelection } from './song-selection';

const FORM_ID = 'audioVideo';

const wrapId = (htmlId: string) => `${FORM_ID}.${htmlId}`;

export const AudioVideo: React.FC<FormProps> = ({ shouldSubmit, values, ...rest }) => {
    const [selectedFuneral] = useSelectedFuneral();
    const [saveAudioVideo] = useSaveAudioVideo();
    // saving
    useEffect(() => {
        if (shouldSubmit && selectedFuneral) {
            // the API works with an array (which is okay), but formik
            // uses an object with numeric keys, so we have to convert between those 2
            const songs = objectToArray(values.audioVideo?.songs);

            saveAudioVideo({
                variables: {
                    id: selectedFuneral.id,
                    audioVideo: {
                        ...values.audioVideo,
                        songs
                    },
                }
            });
        }
    }, [shouldSubmit]);
    return (
        <>
            <Heading level={2} mx="auto" mb="4">
                Beeld en Geluid
            </Heading>
            <Flex>
                <LabelTextField id={wrapId("musicDeliveredBy")} label="Muziek wordt aangeleverd door" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("presentationDeliveredBy")} label="Presentatie foto's/films wordt aangeleverd door" boxProps={{ ml: 2 }} />
            </Flex>
            <Flex>
                <LabelTextField id={wrapId("usePiano")} label="Gebruik piano" boxProps={{ mr: 2 }} />
                <LabelTextField id={wrapId("hasDVD")} label="DVD/USB opname" boxProps={{ ml: 2 }} />
                <LabelTextField id={wrapId("hasCD")} label="CD opname" boxProps={{ ml: 2 }} />
            </Flex>
            <FieldArray
                name={`${FORM_ID}.songs`}
                render={arrayHelpers => (
                    <SongSelection
                        selectedFuneral={selectedFuneral}
                        shouldSubmit={shouldSubmit}
                        values={values}
                        arrayHelpers={arrayHelpers}
                        {...rest}
                    />
                )}
            />
        </>
    );
};
