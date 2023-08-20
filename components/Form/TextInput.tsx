import * as React from "react";
import { TextField } from "@mui/material";
import { FormikProps, getIn } from "formik";

interface Props {
	className?: string;
	fieldName: string;
	placeholder?: string;
	label: string;
	labelShrink?: boolean;
	formik: FormikProps<any>;
}

export default function TextInput({
	className = "",
	fieldName,
	placeholder,
	label,
	labelShrink,
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
			className={className}
			InputLabelProps={{ shrink: labelShrink }}
			variant="outlined"
			label={label}
			placeholder={placeholder ? placeholder : ""}
			fullWidth
			{...formik.getFieldProps(fieldName)}
			error={error}
			helperText={helperText}
		/>
	);
}
