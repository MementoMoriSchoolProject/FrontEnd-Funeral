import React from "react";
import { Label, Input, Textarea } from "@rebass/forms";
import { Box } from "rebass";

const LabelTextAreaField = (props: LabelTextAreaFieldProps) => {
    return (
        <Box width={1}>
            <Label htmlFor={props.id}>
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
    bg?: string
}

export default LabelTextAreaField;