import * as React from "react";
import { TextField } from "@mui/material";
import { FormikProps, getIn } from "formik";

interface Props {
	className?: string;
	fieldName: string;
	type?: "text" | "number";
	placeholder?: string;
	adornmentText?: string;
	label: string;
	labelShrink?: boolean;
	disabled?: boolean;
	formik: FormikProps<any>;
}

export default function TextInput({
	className = "",
	fieldName,
	type = "text",
	placeholder,
	adornmentText,
	label,
	labelShrink = false,
	disabled = false,
	formik,
}: Props) {
	const error =
		getIn(formik.touched, fieldName) &&
		Boolean(getIn(formik.errors, fieldName));
	const helperText = getIn(formik.touched, fieldName) && (
		<>{getIn(formik.errors, fieldName)}</>
	);

	return (
		<TextField
			disabled={disabled}
			className={className}
			InputLabelProps={{ shrink: labelShrink }}
			variant="outlined"
			label={label}
			placeholder={placeholder ? placeholder : ""}
			fullWidth
			type={type}
			{...formik.getFieldProps(fieldName)}
			error={error}
			helperText={helperText}
		/>
	);
}
