import React, { useState } from "react";
import { Button, Card, CardBody, Col, Form, Row } from "reactstrap";
import Auth from "/layouts/Auth.js";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../../components/Form/TextInput";
import { useRouter } from "next/router";
import Link from "next/link";
import SnackAlert from "../../components/Dynamic/SnackAlert";
import {useDispatch, useSelector} from "react-redux";
import LoadingSmall from "../../components/Dynamic/LoadingSmall";
import {passwordActions, resetPassword} from "../../store/features/passwordSlice";

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
});

function ForgotPassword() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loading = useSelector((state) => state.password.loading);
	const error = useSelector((state) => state.password.error);
	const snackMessage = useSelector((state) => state.password.snackMessage);

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(resetPassword(values)).unwrap();
		},
	});

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();
	}, [snackMessage]);

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
					isSnackOpen, handleCloseSnack, snackMessage, error: error,
				}}
			/>
			<Col lg="5" md="7">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="text-center font-bold text-sm text-slate-800 mb-5">
							Enter your email in order to reset your password
						</div>
						<form onSubmit={formik.handleSubmit}>
							<TextInput
								labelShrink
								className="mb-4"
								fieldName="email"
								placeholder="Your email"
								label="Email"
								formik={formik}
							/>
							<div className="text-center">
								<Button disabled={loading} className="my-4" color="primary" type="submit">
									Send code
									{loading ? <LoadingSmall color="text-white-200"/> : null}
								</Button>
							</div>
						</form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col className="text-slate-300" xs="6">
						<Link href="/auth/login">
							go back to login
						</Link>
					</Col>
					<Col className="text-right text-slate-300" xs="6">
						<Link href="/auth/register">
							Create new account
						</Link>
					</Col>
				</Row>
			</Col>
		</>
	);
}

ForgotPassword.layout = Auth;

export default ForgotPassword;
