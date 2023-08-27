import * as React from "react";
import { TextField, Autocomplete, Chip } from "@mui/material";
import { FormikProps, getIn } from "formik";

interface Props {
	className?: string;
	fieldName: string;
	labelName: string;
	valueName: string;
	placeholder?: string;
	label: string;
	labelShrink?: boolean;
	options: any[];
	formik: FormikProps<any>;
}

export default function AutoCompleteInput({
	className,
	fieldName,
	labelName,
	valueName,
	placeholder,
	label,
	labelShrink,
	options,
	formik,
}: Props) {
	const tempValue = getIn(formik.values, fieldName);
	let value: string | null;
	if (tempValue != "") {
		value = options.find((item) => item[valueName] === tempValue);
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
				formik.setFieldValue(
					fieldName,
					newValue ? newValue[valueName] : null
				);
			}}
			options={options}
			getOptionLabel={(option) => option[labelName]}
			renderTags={(tagValue, getTagProps) =>
				tagValue.map((option, index) => (
					<Chip label={option[labelName]} {...getTagProps({ index })} />
				))
			}
			renderInput={(params) => (
				<TextField
					{...params}
					InputLabelProps={{ shrink: labelShrink }}
					label={label}
					value={value}
					error={error}
					helperText={helperText}
					placeholder={placeholder}
				/>
			)}
		/>
	);
}
