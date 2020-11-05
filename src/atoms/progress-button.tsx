import React from 'react';
import { Button, ButtonProps } from 'rebass';

export const ProgressButton: React.FC<ButtonProps & { loading: boolean }> = ({ loading, children, ...rest }) => {
    return (
        <Button {...rest}>
            {/* TODO: Add loading indicator instead of 'Loading...' text */}
            {loading ? 'Loading...' : children}
        </Button>
    )
}