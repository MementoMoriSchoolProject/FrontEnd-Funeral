import React from 'react';
import { Button, ButtonProps } from 'rebass';
import { CgSpinner } from 'react-icons/all';
import styled, { keyframes } from 'styled-components';

const rotate = () => keyframes`
from {
    transform: rotate(0deg);
}

to {
    transform: rotate(360deg);
}
`;

const Spinner = styled(CgSpinner)`
    animation: ${(props: any) => rotate()} 1s linear infinite;
`;

export const ProgressButton: React.FC<ButtonProps & { loading: boolean }> = ({ loading, children, ...rest }) => {
    return (
        <Button variant='primary' {...rest}>
            {loading ? <Spinner size={25} /> : children}
        </Button>
    )
}