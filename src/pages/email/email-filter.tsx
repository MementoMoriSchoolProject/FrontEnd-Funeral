import { Input } from '@rebass/forms';
import React, { Dispatch, SetStateAction } from 'react';
import { Flex } from 'rebass';

interface EmailFilterProps {
    setQuery: Dispatch<SetStateAction<any>>;
}

let inputTimer: any;

export const EmailFilter: React.FC<EmailFilterProps> = (props) => (
    <Flex>
        <Input
            name="query"
            onChange={event => {
                clearTimeout(inputTimer);
                const textValue = `${event.target.value}`;
                inputTimer = setTimeout(() => props.setQuery(textValue), 1000);
            }}
        />
    </Flex>
);
