import React from "react";
import { Label, Select } from "@rebass/forms";
import { Box } from "rebass";

export const LabelSelectField : React.FC<LabelSelectFieldProps> = (props) => {
    return (
        <Box width={1} mb={4}>
            <Label htmlFor={props.id}>
                {props.label}
            </Label>
            <Select
                id={props.id}
                name={props.name}
                defaultValue={props.defaultValue}>
                    {props.children}
            </Select>
        </Box>
    );
}

interface LabelSelectFieldProps {
    id?: string,
    name?: string,
    label?: string,
    defaultValue?: string
}
