import React from "react";
import { Label, Select } from "@rebass/forms";
import { Box, BoxProps } from "rebass";
import { Field } from "formik";

export const LabelSelectField : React.FC<LabelSelectFieldProps> = (props) => (
    <Box width={1} mb={4} {...(props.boxProps)}>
        <Label variant="label" htmlFor={props.id}>
            {props.label}
        </Label>
        <Field name={props.id}>
            {(fieldProps: any) => (
                <Select
                    id={props.id}
                    name={props.name || props.id}
                    defaultValue={props.defaultValue}
                    {...fieldProps.field}
                >
                    {props.children}
                </Select>
            )}
        </Field>
    </Box>
);

interface LabelSelectFieldProps {
    id?: string,
    name?: string,
    label?: string,
    defaultValue?: string,
    boxProps?: BoxProps
}
