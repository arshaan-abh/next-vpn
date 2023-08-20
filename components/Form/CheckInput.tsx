import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { FormikProps, getIn } from "formik";

interface Props {
	className?: string;
	fieldName: string;
	label: string;
	formik: FormikProps<any>;
}

export default function CheckInput({
	className = "",
	fieldName,
	label,
	formik,
}: Props) {
	const value = getIn(formik.values, fieldName);
	const error =
		getIn(formik.touched, fieldName) &&
		Boolean(getIn(formik.errors, fieldName));
	const helperText = getIn(formik.touched, fieldName) && (
		<>{getIn(formik.errors, fieldName)}</>
	);
	return (
		<FormControl
			error={error}
			component="fieldset"
			fullWidth
			variant="standard"
			className={className}
		>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							checked={value}
							onChange={(e) => formik.setFieldValue(fieldName, !value)}
							name={fieldName}
						/>
					}
					label={label}
				/>
			</FormGroup>
			{error && (
				<FormHelperText error={error} id={`${name}-helper-text`}>
					{helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
}
