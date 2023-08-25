import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormikProps, getIn } from "formik";

interface Props {
	className?: string;
	fieldName: string;
	options: { label: string; value: string | boolean | number }[];
	formik: FormikProps<any>;
}

export default function ToggleInput({
	className = "",
	fieldName,
	options,
	formik,
}: Props) {
	const value = getIn(formik.values, fieldName);

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		value: string
	) => {
		if (value !== null) {
			formik.setFieldValue(fieldName, value);
		}
	};

	return (
		<ToggleButtonGroup
			className={className}
			color="primary"
			value={value}
			exclusive
			onChange={handleChange}
		>
			{options.map((item, index) => {
				return <ToggleButton value={item.value}>{item.label}</ToggleButton>;
			})}
		</ToggleButtonGroup>
	);
}
