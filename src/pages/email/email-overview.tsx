import React, { useState } from 'react';
import { Flex } from 'rebass';
import { EmailFilter } from './email-filter';
import { EmailList } from './email-list';
import { EmailSingle } from './email-single';
import { EnableEmailIntegration } from './enable-email-integration';
import { inbox_emails_emails as Email } from './__generated__/inbox';

interface EmailOverviewProps {
    labels: string[]
}

export const EmailOverview: React.FC<EmailOverviewProps> = ({ labels }: EmailOverviewProps) => {
    const [query, setQuery] = useState<string | undefined>(undefined);
    const [selectedEmail, selectEmail] = useState<Email | undefined>(undefined);
    const [isAuthorized, setAuthorized] = useState<boolean | undefined>(undefined);

    if (isAuthorized === false) {
        return (
            <EnableEmailIntegration />
        );
    }

    return (
        <Flex width="100%" height="100%" justifyContent="stretch" flexDirection="column">
            {!selectedEmail ? (
                <>
                    {isAuthorized !== undefined ? (
                        <EmailFilter
                            setQuery={(va) => {
                                setQuery(va);
                            }}
                        />
                    ) : (
                        <></>
                    )}
                    <EmailList
                        isAuthorized={isAuthorized}
                        setAuthorized={setAuthorized}
                        onSelect={selectEmail}
                        query={query || ''}
                        labels={labels}
                    />
                </>
            ) : (
                <EmailSingle email={selectedEmail} onBack={() => selectEmail(undefined)} />
            )}
        </Flex>
    );
};
