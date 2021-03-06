import React from "react";
import { Label, Textarea } from "@rebass/forms";
import { Box, BoxProps } from "rebass";
import { Field } from "formik";

const LabelTextAreaField = (props: LabelTextAreaFieldProps) => (
    <Box width={1} mb={4} {...(props.boxProps)}>
        <Label variant="label" htmlFor={props.id}>
            {props.label}
        </Label>
        <Field name={props.id}>
            {(fieldProps: any) => (
                <Textarea
                    id={props.id}
                    name={props.id}
                    placeholder={props.placeholder}
                    bg={props.bg}
                    {...fieldProps.field}
                />
            )}
        </Field>
    </Box>
);

interface LabelTextAreaFieldProps {
    id?: string,
    label?: string,
    placeholder?: string,
    name?: string,
    bg?: string,
    boxProps?: BoxProps
}

export default LabelTextAreaField;
