import React from 'react';
import { Flex } from 'rebass';
import { Text } from '../../atoms/text';
import { inbox_emails_emails as Email } from './__generated__/inbox';

interface EmailItemProps {
    onSelect: (_email: Email) => void;
    email: Email
}

export const EmailItem: React.FC<EmailItemProps> = ({ email, onSelect }) => (
    <Flex px={1} py={2} style={{ border: "solid 1px gray", borderWidth: "0 0 1px 0", cursor: "pointer" }} onClick={() => onSelect(email)}>
        <Text variant="ellipsis"><b>{email.subject}</b> - {email.snippet}</Text>
    </Flex>
);
