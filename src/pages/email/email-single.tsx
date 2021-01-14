import React from 'react';
import { Box, Button, Flex } from 'rebass';
import SanitizedHTML from 'react-sanitized-html';
import { defaults } from 'sanitize-html';
import { Base64 } from 'js-base64';
import { FaArrowLeft } from 'react-icons/fa';
import { Heading } from '../../atoms/heading';
import { Text } from '../../atoms/text';
import { inbox_emails_emails as Email } from './__generated__/inbox';

interface EmailSingleProps {
    email: Email;
    onBack: () => void;
}

export const EmailSingle: React.FC<EmailSingleProps> = ({ email, onBack }) => (
    <Flex flexDirection="column">
        <Box ml={3}>
            <Flex>
                <Flex flexGrow={1}>
                    <Heading level={1}>{email.subject}</Heading>
                </Flex>
                <Flex flexGrow={0}>
                    <Button onClick={onBack}>
                        <FaArrowLeft />
                    </Button>
                </Flex>
            </Flex>

            <Text>Date: {email.date}</Text>
            <Text>From: {email.from}</Text>
            <Text>To: {email.to}</Text>
        </Box>
        <SanitizedHTML
            allowedTags={[...defaults.allowedTags, 'img', 'style', 'div']}
            allowedAttributes={{ ...defaults.allowedAttributes, '*': ['style'] }}
            html={Base64.decode(email.content || '')}
        />
    </Flex>
);
