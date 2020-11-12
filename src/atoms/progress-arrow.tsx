import React from 'react';
import { Button, ButtonProps } from 'rebass';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

interface ProgressArrowProps {
    direction: 'previous' | 'next';
}

const content = {
    previous: {
        text: '<<',
        icon: FaArrowLeft
    },
    next: {
        text: '>>',
        icon: FaArrowRight
    }
};

export const ProgressArrow: React.FC<ProgressArrowProps & ButtonProps> = ({ direction, ...props }) => {
    const Icon = content[direction].icon;
    return (
        <Button pb={1} {...props}>
            <Icon />
        </Button>
    );
};
