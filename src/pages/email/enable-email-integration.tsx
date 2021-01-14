import React from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../atoms/heading';
import { ProgressButton } from '../../atoms/progress-button';
import { Text } from '../../atoms/text';
import { useInitiateGmailIntegration } from './initiate-integration';

export const EnableEmailIntegration: React.FC<{}> = () => {
    const [startGmailIntegration, { loading }] = useInitiateGmailIntegration();

    return (
        <Flex flexDirection="column" alignItems="center" mx={5}>
            <Heading level={1}>Gmail integration</Heading>
            <Text mb={3} textAlign="center">
                Memento Mori heeft een ingebouwd gmail sorteert systeem wat het makkelijker maakt om te&nbsp;
                zien welke emails voor welk deel van een begrafenis bedoelt zijn.Klik hieronder om deze&nbsp;
                functie aan uw gmail account te koppelen.
            </Text>
            <ProgressButton
                loading={loading}
                onClick={() => {
                    startGmailIntegration({
                        variables: {
                            redirect: window.location.href
                        }
                    }).then(result => {
                        if (result.data) {
                            window.location = result.data.authorizeGoogleForEmail as any;
                        }
                    });
                }}
            >
                Koppel Gmail
            </ProgressButton>
        </Flex>
    );
};
