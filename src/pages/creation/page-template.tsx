import React from 'react';
import { Flex } from 'rebass';
import { Heading } from '../../atoms/heading';
import { ColoredLine } from '../../atoms/line';

export const PageTemplate: React.FC<{ title: string }> = (props) => (
    <Flex flexDirection='column' alignItems='center' width='100%'>
        <Flex>
            <Heading level={1} mx="auto" mb="4">
                {props.title}
            </Heading>
        </Flex>
        <ColoredLine color='black' height='3px' />
        <Flex flexDirection='column' width={[1, 1, 1, 1/2, 1/3]} variant='scrollList' p={2} px={3}>
            {props.children}
        </Flex>
    </Flex>
)