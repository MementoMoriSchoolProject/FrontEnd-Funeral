import React from 'react';
import { TextProps, Text as RebassText } from 'rebass';

export const Text: React.FC<TextProps> = ({ children, ...rest }) => (
    <RebassText variant="text" {...rest}>
        {children}
    </RebassText>
);
