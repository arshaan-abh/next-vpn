import * as React from "react";


// reactstrap components
import {
	Button,
	Card,
	CardBody,
	Col,
} from "reactstrap";
// layout for this page
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import CheckInput from "../../components/Form/CheckInput";
import PasswordInput from "../../components/Form/PasswordInput";
import TextInput from "../../components/Form/TextInput";

const validationSchema = yup.object().shape({
	name: yup.string()
		.matches(
			/^[A-Za-z\s]+$/,
			"Name can only contain English letters and spaces"
		)
		.required("Name is required"),
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
	agree: yup
		.boolean()
		.required("Please agree to our privary policy before continuing"),
});

function Register() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			agree: false,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			router.push("/auth/selectrole");
		},
	});

	return (
		<>
			<Col lg="6" md="8">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="text-center font-bold text-lg text-slate-800 mb-5">
							Sign up
						</div>
						<form onSubmit={formik.handleSubmit}>
							<TextInput
								labelShrink
								className="mb-4"
								fieldName="name"
								placeholder="Your name"
								label="Name"
								formik={formik}
							/>

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
								className="mb-4"
								fieldName="password"
								placeholder="Your password"
								label="Password"
								formik={formik}
							/>

							<div className="text-muted font-italic">
								<small>
									password strength:{" "}
									<span className="text-success font-weight-700">strong</span>
								</small>
							</div>

							<CheckInput
								className="my-2"
								fieldName="agree"
								label="Agree with our"
								link="/"
								linkName="privacy policy"
								formik={formik}
							/>

							<div className="text-center">
								<Button className="mt-4" color="primary" type="submit">
									Create account
								</Button>
							</div>
						</form>
					</CardBody>
				</Card>
			</Col>
		</>
	);
}

Register.layout = Auth;

export default Register;
