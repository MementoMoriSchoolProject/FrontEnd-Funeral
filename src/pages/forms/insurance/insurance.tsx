import React, { useEffect } from 'react';
import { Box, Flex } from 'rebass';
import { Heading } from '../../../atoms/heading';
import { ProgressButton } from '../../../atoms/progress-button';
import { LabelTextField } from '../../../components/LabelTextField';
import { FormProps } from '../../create/creation-framework';

const wrapId = (htmlId: string) => `insurance.${htmlId}`;

export const Insurance: React.FC<FormProps> = ({ shouldSubmit }) => {
    useEffect(() => {
        if (shouldSubmit) {
            console.log('Submitting Insurance!');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldSubmit]);
    useEffect(() => {
        console.log('Run once (Insurance)');
    }, []);

    return (
        <>
            <Heading fontSize={[1, 2, 3]} color="#000" mx="auto" mb="4">
                Verzekering
            </Heading>
            <Box p={4} mb={4} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }}>
                <Flex>
                    <LabelTextField id={wrapId("maatschappij")} label="Maatschappij" />
                </Flex>
                <Flex>
                    <LabelTextField id={wrapId("polisnummer")} label="Polisnummer" />
                </Flex>
            </Box>
            <ProgressButton mb={4} loading={false}>Voeg verzekering toe</ProgressButton>
        </>
    );
};