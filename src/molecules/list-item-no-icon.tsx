import React from 'react';
import { Flex } from 'rebass';

export const ListItemNoIcon: React.FC<{}> = ({ children, ...rest }) => (
    <Flex mb={4} sx={{ boxShadow: '0 0 16px rgba(0, 0, 0, .25)' }} {...rest}>
        <Flex px={4} pt={4} flexGrow={1} flexDirection="column" alignItems="stretch">
            {children}
        </Flex>
    </Flex>
);
