import React from 'react';
import { Box, BoxProps } from 'rebass';

export const ColoredLine = (props: BoxProps) => (
    <Box
        as='hr'
        width='100%'
        mb={4}
        bg={props.color}
        {...props}
    />
);