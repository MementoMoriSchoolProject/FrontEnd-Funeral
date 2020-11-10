import React from "react";
import { Label, Textarea } from "@rebass/forms";
import { Box, BoxProps } from "rebass";

const LabelTextAreaField = (props: LabelTextAreaFieldProps) => {
    return (
        <Box width={1} mb={4} {...(props.boxProps)}>
            <Label variant='label' htmlFor={props.id}>
                {props.label}
            </Label>
            <Textarea
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                bg={props.bg}
            />
        </Box>
    );
}

interface LabelTextAreaFieldProps {
    id?: string,
    label?: string,
    placeholder?: string,
    name?: string,
    bg?: string,
    boxProps?: BoxProps
}

export default LabelTextAreaField;