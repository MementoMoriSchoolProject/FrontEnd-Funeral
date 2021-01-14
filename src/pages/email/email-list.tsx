import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Flex } from 'rebass';
import { Spinner } from '../../atoms/spinner';
import { EmailItem } from './email-item';
import { useGetEmails } from './get-emails';
import { inbox_emails_emails as Email } from './__generated__/inbox';

interface EmailListProps {
    onSelect: (_email: Email) => void;
    query: string;
    labels: string[];
    setAuthorized: Dispatch<SetStateAction<boolean | undefined>>;
    isAuthorized?: boolean;
}

export const EmailList: React.FC<EmailListProps> = ({ labels, query, onSelect, setAuthorized, isAuthorized }) => {
    const { data, loading, error } = useGetEmails({
        input: {
            labels,
            query
        }
    });
    const inbox = data?.emails;

    useEffect(() => {
        setAuthorized(true);
    }, [inbox]);

    if (loading) {
        setAuthorized(undefined);
        return (
            <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
                <Spinner size={25} />
            </Flex>
        );
    }

    if (error) {
        setAuthorized(false);
        return (
            <></>
        );
    }

    return (
        <Flex flexDirection="column">
            {inbox?.emails?.map((email: Email) => (
                <EmailItem email={email} onSelect={onSelect} />
            ))}
        </Flex>
    );
};
