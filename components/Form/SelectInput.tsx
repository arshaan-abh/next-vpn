import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select"; // Update import statement
import { FormHelperText } from "@mui/material";
import { FormikProps, getIn } from "formik";

interface Props {
	className?: string;
	fieldName: string;
	placeholder?: string;
	label: string;
	options: string[];
	labelShrink?: boolean;
	formik: FormikProps<any>;
}

export default function SelectInput({
	className = "",
	fieldName,
	placeholder,
	label,
	options,
	labelShrink = false,
	formik,
}: Props) {
	const value = getIn(formik.values, fieldName);
	const error =
		getIn(formik.touched, fieldName) &&
		Boolean(getIn(formik.errors, fieldName));
	const helperText = getIn(formik.touched, fieldName) && (
		<>{getIn(formik.errors, fieldName)}</>
	);

	const handleChange = (
		event: SelectChangeEvent<string> // Update the event type
	) => {
		formik.setFieldValue(fieldName, event.target.value); // Remove 'as string'
	};

	return (
		<FormControl className={className} variant="outlined" fullWidth>
			<InputLabel shrink={labelShrink} error={error} id={`${fieldName}-label`}>
				{label}
			</InputLabel>
			<Select
				labelId={`${fieldName}-label`}
				id={fieldName}
				value={value}
				label={label}
				onChange={handleChange}
				error={error}
				placeholder={placeholder ? placeholder : ""}
			>
				<MenuItem value="" disabled>
					<em>انتخاب کنید</em>
				</MenuItem>
				{options.map((item, index) => {
					return (
						<MenuItem key={index} value={item}>
							{item}
						</MenuItem>
					); // Add key prop for each MenuItem
				})}
			</Select>
			{error && (
				<FormHelperText error={error} id={`${name}-helper-text`}>
					{helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
}
