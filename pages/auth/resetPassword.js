import React, { useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import Auth from "/layouts/Auth.js";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../../components/Form/TextInput";
import { useRouter } from "next/router";
import SnackAlert from "../../components/Dynamic/SnackAlert";
import { useDispatch, useSelector } from "react-redux";
import LoadingSmall from "../../components/Dynamic/LoadingSmall";
import {
	passwordActions,
	updatePassword,
} from "../../store/features/passwordSlice";
import PasswordInput from "../../components/Form/PasswordInput";

const validationSchema = yup.object().shape({
	token: yup.string().required("Token is required"),
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/,
			"Password must be at least 8 characters and include letters and numbers"
		)
		.required("Password is required"),
});

function ResetPassword() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loading = useSelector((state) => state.password.loading);
	const stage = useSelector((state) => state.password.stage);
	const error = useSelector((state) => state.password.error);
	const snackMessage = useSelector((state) => state.password.snackMessage);

	const formik = useFormik({
		initialValues: {
			token: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(updatePassword(values)).unwrap();
		},
	});

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();
	}, [snackMessage]);

	React.useEffect(() => {
		if (stage === "update") {
			setTimeout(() => {
				dispatch(passwordActions.clearStage());
				router.push("/auth/login");
			}, 2000);
		}
	}, [stage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = (text) => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(passwordActions.clearSnackMessage());
	};

	return (
		<>
			<SnackAlert
				props={{
					isSnackOpen,
					handleCloseSnack,
					snackMessage,
					error: error,
				}}
			/>
			<Col lg="5" md="7">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="text-center font-bold text-sm text-slate-800 mb-5">
							Enter your new password
						</div>
						<form onSubmit={formik.handleSubmit}>
							<TextInput
								labelShrink
								className="mb-4"
								fieldName="token"
								placeholder="Received token from your email"
								label="Verification token"
								formik={formik}
							/>

							<PasswordInput
								labelShrink
								className="mb-4"
								fieldName="password"
								placeholder="New password"
								label="Password"
								formik={formik}
							/>

							<Button
								disabled={loading}
								className="mt-4 !flex flex-row mx-auto align-items-center h-12"
								color="primary"
								type="submit"
							>
								Update password
								{loading ? <LoadingSmall color="text-white-200" /> : null}
							</Button>
						</form>
					</CardBody>
				</Card>
			</Col>
		</>
	);
}

ResetPassword.layout = Auth;

export default ResetPassword;
