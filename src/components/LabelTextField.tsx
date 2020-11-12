import React from "react";
import { Label, Input, LabelProps, InputProps } from "@rebass/forms";
import { Box, BoxProps } from "rebass";
import { Field } from "formik";

export const LabelTextField = (props: LabelTextFieldProps) => (
    <Box width={1} mb={4} {...(props.boxProps || {})}>
        <Label variant="label" {...(props.labelProps || {})}>
            {props.label}
        </Label>
        <Field name={props.id}>
            {(fieldProps: any) => (
                <Input
                    id={props.id}
                    name={props.id}
                    type={props.type || 'text'}
                    placeholder={props.placeholder}
                    {...(props.inputProps || {})}
                    {...fieldProps.field}
                />
            )}
        </Field>
    </Box>
);

interface LabelTextFieldProps {
    id?: string,
    label?: string,
    placeholder?: string,
    type?: string,
    labelProps?: LabelProps,
    inputProps?: InputProps,
    boxProps?: BoxProps,
}
