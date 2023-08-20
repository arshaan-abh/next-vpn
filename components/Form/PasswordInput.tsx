import * as React from "react";
import { TextField, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormikProps, getIn } from "formik";

interface Props {
	className?: string;
	fieldName: string;
	placeholder?: string;
	label: string;
	labelShrink?: boolean;
	formik: FormikProps<any>;
}

export default function PasswordInput({
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

	const [showPassword, setShowPassword] = React.useState(false);

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<TextField
			className={className}
			InputLabelProps={{ shrink: labelShrink }}
			variant="outlined"
			type={showPassword ? "text" : "password"}
			label={label}
			placeholder={placeholder ? placeholder : ""}
			fullWidth
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						{showPassword ? (
							<VisibilityOffIcon
								onClick={handleTogglePasswordVisibility}
								style={{
									cursor: "pointer",
									color: "var(--primary-color)",
								}}
							/>
						) : (
							<VisibilityIcon
								onClick={handleTogglePasswordVisibility}
								style={{
									cursor: "pointer",
									color: "var(--primary-color)",
								}}
							/>
						)}
					</InputAdornment>
				),
			}}
			{...formik.getFieldProps(fieldName)}
			error={error}
			helperText={helperText}
		/>
	);
}
