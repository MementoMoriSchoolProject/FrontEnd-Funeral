import React from 'react';
import { Button, ButtonProps } from 'rebass';
import { Spinner } from './spinner';

export const ProgressButton: React.FC<ButtonProps & { loading: boolean }> = ({ loading, children, ...rest }) => (
    <Button variant="primary" {...rest}>
        {loading ? <Spinner size={25} /> : children}
    </Button>
);
