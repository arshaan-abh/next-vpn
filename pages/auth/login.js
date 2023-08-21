import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// reactstrap components
import { Button, Card, CardBody, Row, Col } from "reactstrap";
// layout for this page
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import CheckInput from "../../components/Form/CheckInput";
import PasswordInput from "../../components/Form/PasswordInput";
import TextInput from "../../components/Form/TextInput";
import Link from "next/link";

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/,
			"Password must be at least 8 characters and include letters, numbers, and special characters"
		)
		.required("Password is required"),
	rememberme: yup.boolean(),
});

function Login() {
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
						<div className="text-center font-bold text-lg text-slate-800 mb-5">
							Sign in
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

							<PasswordInput
								labelShrink
								className="mb-2"
								fieldName="password"
								placeholder="Your password"
								label="Password"
								formik={formik}
							/>

							<CheckInput
								className="mb-4"
								fieldName="rememberme"
								label="Remember me"
								formik={formik}
							/>

							<div className="text-center">
								<Button color="primary" type="submit">
									Sign in
								</Button>
							</div>
						</form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col className="text-slate-300" xs="6">
						<Link
							href="/auth/forgotPassword"
							onClick={(e) => e.preventDefault()}
						>
							<small>Forgot password?</small>
						</Link>
					</Col>
					<Col className="text-right text-slate-300" xs="6">
						<Link href="/auth/register" onClick={(e) => e.preventDefault()}>
							<small>Create new account</small>
						</Link>
					</Col>
				</Row>
			</Col>
		</>
	);
}

Login.layout = Auth;

export default Login;
