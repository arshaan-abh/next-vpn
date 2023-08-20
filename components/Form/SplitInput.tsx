import * as React from "react";
import { OutlinedInput, InputLabel, FormHelperText } from "@mui/material";
import { FormikProps, getIn } from "formik";

interface Props {
	fieldName: string;
	label: string;
	className?: string;
	formik: FormikProps<any>;
	count: number;
}

export const getSplitInputLength = (value: String) => {
	let inputArray: string[] = [];

	if (Array.isArray(value)) {
		inputArray = value;
	} else if (typeof value === "string") {
		inputArray = value.split("");
	}
	
	inputArray = inputArray.filter((value) => value !== "");
	return inputArray.length;
};

export default function SplitInput({
	fieldName,
	label,
	className,
	formik,
	count,
}: Props) {
	const value = getIn(formik.values, fieldName);
	const error =
		getIn(formik.touched, fieldName) &&
		Boolean(getIn(formik.errors, fieldName));
	const helperText = getIn(formik.touched, fieldName) && (
		<>{getIn(formik.errors, fieldName)}</>
	);

	const returnValueArray = () => {
		let inputArray: string[] = [];

		if (Array.isArray(value)) {
			inputArray = value;
		} else if (typeof value === "string") {
			inputArray = value.split("");
		}

		return inputArray;
	};

	// Handle click event on the input
	const handleClick = () => {
		const inputArray: string[] = returnValueArray();

		// Check for empty inputs with lower indexes
		for (let i = 0; i <= count - 1; i++) {
			if (inputArray[i] === "" || inputArray[i] === undefined) {
				// Focus on the first empty input
				document.getElementById(`${fieldName}-${i}`)?.focus();
				return; // Exit the function to prevent further changes
			}
		}

		// If no empty inputs found, you can add additional onBlur logic here
	};

	// Handle key down event on the input
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const inputArray: string[] = returnValueArray();
		const index = parseInt(e.currentTarget.id.split("-")[1]);

		if (e.key === "Backspace" && index > 0) {
			e.preventDefault(); // Prevent the default behavior of the backspace key

			if (inputArray[index] !== undefined || inputArray[index] !== "") {
				// Update the input array by replacing the value at the current index with an empty string
				const updatedArray = [
					...value.slice(0, index),
					"",
					...value.slice(index + 1),
				];
				formik.setFieldValue(fieldName, updatedArray);
			}

			if (inputArray[index] === undefined || inputArray[index] === "") {
				// Focus on the previous input if the current input is empty
				const previousInput = document.getElementById(
					`${fieldName}-${index - 1}`
				);
				previousInput?.focus();
			}
		}
	};

	// Handle change event on the input
	const handleChange =
		(index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const inputArray: string[] = returnValueArray();
			const { value: inputValue } = e.target;
			const numericValue = /^\d*$/.test(inputValue) ? inputValue : "";
			const updatedInput = [...value];
			updatedInput[index] = numericValue;

			if (
				numericValue.length === 0 ||
				inputArray[index] !== undefined ||
				inputArray[index] !== ""
			) {
				const updatedArray = [
					...value.slice(0, index),
					"",
					...value.slice(index + 1),
				];
				formik.setFieldValue(fieldName, updatedArray);
			}

			if (inputArray[index] !== undefined || inputArray[index] !== "") {
				const updatedArray = [
					...value.slice(0, index),
					"",
					...value.slice(index + 1),
				];
				formik.setFieldValue(fieldName, updatedArray);
			}

			if (
				inputArray.filter((value) => value !== "").length < count &&
				numericValue.length === 1
			) {
				formik.setFieldValue(fieldName, updatedInput.join(""));
			}

			if (numericValue.length === 1 && index < count - 1) {
				// Focus on the next input if a numeric value is entered and it's not the last input
				const nextInput = document.getElementById(`${fieldName}-${index + 1}`);
				nextInput?.focus();
			}
		};

	return (
		<div className={`splitinputcontrol ${className}`}>
			<InputLabel
				size="normal"
				shrink
				className="splitinputlabel"
				error={error}
			>
				{label}
			</InputLabel>
			<div className="splitinputcontainer">
				{[...Array(count)].map((_, index) => (
					<OutlinedInput
						key={index}
						className="active-border splitinput"
						id={`${fieldName}-${index}`}
						name={`${fieldName}-${index}`}
						aria-describedby={`${fieldName}-helper-${index}`}
						value={value[index]}
						onClick={handleClick}
						onKeyDown={handleKeyDown}
						onChange={handleChange(index)}
					/>
				))}
			</div>
			{error && (
				<FormHelperText error={error} id={`${fieldName}-helper-text`}>
					{helperText}
				</FormHelperText>
			)}
		</div>
	);
}
