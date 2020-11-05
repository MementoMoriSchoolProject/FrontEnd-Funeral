import React from 'react';
import { Box, BoxProps } from 'rebass';

export const ColoredLine = (props: BoxProps) => (
    <Box
        as='hr'
        bg={props.color}
        {...props}
    />
);