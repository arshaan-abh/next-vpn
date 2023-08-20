import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// reactstrap components
import {
	Button,
	Card,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
} from "reactstrap";
// layout for this page
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import CheckInput from "../../components/Form/CheckInput";

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
			router.push("/selectrole");
		},
	});

	return (
		<>
			<Col lg="5" md="7">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="text-center text-muted mb-4">
							<small>Sign in</small>
						</div>
						<Form role="form">
							<FormGroup className="mb-3"></FormGroup>
							<FormGroup>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-lock-circle-open" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Password"
										type="password"
										autoComplete="new-password"
									/>
								</InputGroup>
							</FormGroup>
							<CheckInput
								fieldName="rememberme"
								label="Remember me"
								formik={formik}
							/>
							<div className="text-center">
								<Button
									className="my-4"
									color="primary"
									type="button"
									onClick={formik.handleSubmit}
								>
									Sign in
								</Button>
							</div>
						</Form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col xs="6">
						<a
							className="text-light"
							href="#pablo"
							onClick={(e) => e.preventDefault()}
						>
							<small>Forgot password?</small>
						</a>
					</Col>
					<Col className="text-right" xs="6">
						<a
							className="text-light"
							href="#pablo"
							onClick={(e) => e.preventDefault()}
						>
							<small>Create new account</small>
						</a>
					</Col>
				</Row>
			</Col>
		</>
	);
}

Login.layout = Auth;

export default Login;
