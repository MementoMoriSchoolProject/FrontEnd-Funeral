import React from "react";
import { Label, Input } from "@rebass/forms";
import { Box } from "rebass";

const LabelTextField = (props:LabelTextFieldProps) => {
    return (
        <Box width={1} mb={4}>
            <Label>
                {props.label}
            </Label>
            <Input
                tabIndex={1}
                id={props.id} 
                type='text'
                placeholder={props.placeholder}
            />
        </Box>
    );
}

interface LabelTextFieldProps {
    id?: string,
    label?: string,
    placeholder?: string
}

export default LabelTextField;