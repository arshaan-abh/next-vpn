import * as React from "react";
// reactstrap components
import { Button, Card, CardBody, Col, Row } from "reactstrap";
// layout for this page
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import CheckInput from "../../components/Form/CheckInput";
import PasswordInput from "../../components/Form/PasswordInput";
import TextInput from "../../components/Form/TextInput";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
	emailRegister,
	registerActions,
} from "../../store/features/registerSlice";
import LoadingSmall from "../../components/Dynamic/LoadingSmall";
import SnackAlert from "../../components/Dynamic/SnackAlert";

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.matches(
			/^[A-Za-z0-9_]+$/,
			"Username can only contain letters, numbers, and underscores"
		)
		.required("Username is required"),
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/,
			"Password must be at least 8 characters and include letters and numbers"
		)
		.required("Password is required"),
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	agree: yup
		.boolean()
		.test(
			"agree",
			"Please agree to our privary policy before continuing",
			function (value) {
				return value;
			}
		)
		.required("Please agree to our privary policy before continuing"),
});

function Register() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			referralCode: "",
			agree: false,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			let temp = values;
			delete temp["agree"];
			dispatch(emailRegister(temp)).unwrap();
		},
	});

	const dispatch = useDispatch();

	const loading = useSelector((state) => state.register.loading);
	const error = useSelector((state) => state.register.error);
	const snackMessage = useSelector((state) => state.register.snackMessage);
	const stage = useSelector((state) => state.register.stage);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	React.useEffect(() => {
		if (stage === "register") {
			router.push("/auth/registerVerification");
			dispatch(registerActions.clearStage());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(registerActions.clearSnackMessage());
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
								fieldName="username"
								placeholder="Pick a username"
								label="Username"
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

							{/* <div className="text-muted">
								<small>
									password strength:{" "}
									<span className="text-success font-weight-700">strong</span>
								</small>
							</div> */}

							<CheckInput
								className="mb-2"
								fieldName="agree"
								label="Agree with our"
								link="/"
								linkName="privacy policy"
								formik={formik}
							/>

							<Button
								disabled={loading}
								className="mt-4 !flex flex-row mx-auto align-items-center h-12"
								color="primary"
								type="submit"
							>
								Create account
								{loading ? <LoadingSmall color="text-white-200" /> : null}
							</Button>
						</form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col className="text-slate-300" xs="6">
						<Link href="/auth/login">Already have an acount?</Link>
					</Col>
				</Row>
			</Col>
		</>
	);
}

Register.layout = Auth;

export default Register;
