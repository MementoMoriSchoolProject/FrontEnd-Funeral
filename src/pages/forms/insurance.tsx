import React from 'react';
import { Box, Button, Flex } from 'rebass';
import { Heading } from '../../atoms/heading';
import { LabelTextField } from '../../components/LabelTextField';

const wrapId = (htmlId: string) => `insurance.${htmlId}`;

export const Insurance: React.FC<{}> = () => (
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
        <Button width={1} mb={4} py={3} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }} bg="#A0BDE3">Voeg verzekering toe</Button>
    </>
);