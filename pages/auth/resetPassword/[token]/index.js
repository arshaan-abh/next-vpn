import React, { useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import Auth from "/layouts/Auth.js";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import SnackAlert from "../../../../components/Dynamic/SnackAlert";
import { useDispatch, useSelector } from "react-redux";
import LoadingSmall from "../../../../components/Dynamic/LoadingSmall";
import {
	passwordActions,
	updatePassword,
} from "../../../../store/features/passwordSlice";
import PasswordInput from "../../../../components/Form/PasswordInput";

const validationSchema = yup.object().shape({
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/,
			"Password must be at least 8 characters and include letters and numbers"
		)
		.required("Password is required"),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords do not match")
		.required("Confirming password is required"),
});

function Page() {
	const router = useRouter();
	const dispatch = useDispatch();

const { token } = router.query;

	const loading = useSelector((state) => state.password.loading);
	const stage = useSelector((state) => state.password.stage);
	const error = useSelector((state) => state.password.error);
	const snackMessage = useSelector((state) => state.password.snackMessage);

	const formik = useFormik({
		initialValues: {
			token: token,
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

	const handleOpenSnack = () => {
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
							<PasswordInput
								labelShrink
								className="mb-4"
								fieldName="password"
								placeholder="New password"
								label="Password"
								formik={formik}
							/>

							<PasswordInput
								labelShrink
								className="mb-4"
								fieldName="passwordConfirm"
								placeholder="Repeat your password"
								label="Confirm password"
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

Page.layout = Auth;

export default Page;
