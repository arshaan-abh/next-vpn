import * as React from "react";
import { TextField, Autocomplete, Chip } from "@mui/material";
import { FormikProps, getIn } from "formik";

interface Props {
	className?: string;
	fieldName: string;
	placeholder?: string;
	label: string;
	labelShrink?: boolean;
	options: string[];
	formik: FormikProps<any>;
}

export default function AutoCompleteInput({
	className,
	fieldName,
	placeholder,
	label,
	labelShrink,
	options,
	formik,
}: Props) {
	const tempValue = getIn(formik.values, fieldName);
	let value: string | null;
	if (tempValue != "") {
		value = tempValue;
	} else {
		value = null;
	}
	const error =
		getIn(formik.touched, fieldName) &&
		Boolean(getIn(formik.errors, fieldName));
	const helperText = getIn(formik.touched, fieldName) && (
		<>{getIn(formik.errors, fieldName)}</>
	);

	return (
		<Autocomplete
			className={className}
			value={value}
			onChange={(event, newValue) => {
				formik.setFieldValue(fieldName, newValue);
			}}
			options={options}
			getOptionLabel={(option) => option}
			renderTags={(tagValue, getTagProps) =>
				tagValue.map((option, index) => (
					<Chip label={option} {...getTagProps({ index })} />
				))
			}
			renderInput={(params) => (
				<TextField
					{...params}
					InputLabelProps={{ shrink: labelShrink }}
					label={label}
					error={error}
					helperText={helperText}
					placeholder={placeholder}
				/>
			)}
		/>
	);
}
