import React, { useState } from "react";
import { Button, Card, CardBody, Col, Form, Row } from "reactstrap";
import Auth from "/layouts/Auth.js";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../../components/Form/TextInput";
import { useRouter } from "next/router";
import Link from "next/link";

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
});

function ForgotPassword() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			rememberme: false,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			router.push("/auth/selectrole");
		},
	});

	return (
		<>
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
								<Button className="my-4" color="primary" type="submit">
									Send code
								</Button>
							</div>
						</form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col xs="6">
						<Link
							className="text-light"
							href="/auth/login"
							onClick={(e) => e.preventDefault()}
						>
							<small>go back to login</small>
						</Link>
					</Col>
					<Col className="text-right" xs="6">
						<Link
							className="text-light"
							href="/auth/register"
							onClick={(e) => e.preventDefault()}
						>
							<small>Create new account</small>
						</Link>
					</Col>
				</Row>
			</Col>
		</>
	);
}

ForgetPassword.layout = Auth;

export default ForgotPassword;
