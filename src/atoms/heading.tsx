import React from 'react';
import { Text as RebassText, TextProps } from 'rebass';

export const Heading: React.FC<TextProps & { level?: 1 | 2 | 3 }> = ({ children, level, ...rest }) => (
    <RebassText variant={`heading${level || 1}`} {...rest}>
        {children}
    </RebassText>
);
