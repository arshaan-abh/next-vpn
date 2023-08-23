import * as React from "react";
// reactstrap components
import { Button, Card, CardBody, Row, Col } from "reactstrap";
// layout for this page
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import CheckInput from "../../components/Form/CheckInput";
import PasswordInput from "../../components/Form/PasswordInput";
import TextInput from "../../components/Form/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { login, loginActions } from "../../store/features/loginSlice";
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
			"Password must be at least 8 characters and include letters, numbers, and special characters"
		)
		.required("Password is required"),
	rememberme: yup.boolean(),
});

function Login() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loading = useSelector((state) => state.login.loading);
	const stage = useSelector((state) => state.login.stage);
	const snackMessage = useSelector((state) => state.login.snackMessage);

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
			rememberme: false,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			let temp = values;
			delete temp["rememberme"];
			dispatch(login(temp)).unwrap();
		},
	});

	React.useEffect(() => {
		if (snackMessage != "") handleOpenSnack();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	React.useEffect(() => {
		if (stage === "login") {
			router.push("/selectrole");
			dispatch(loginActions.clearStage());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = (text) => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(loginActions.clearSnackMessage());
	};

	return (
		<>
			<SnackAlert
				props={{
					isSnackOpen,
					handleCloseSnack,
					snackMessage,
					error: true,
				}}
			/>

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
								fieldName="username"
								placeholder="Your username"
								label="Username"
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
								<Button
									disabled={loading}
									className="mt-4 flex flex-row h-12"
									color="primary"
									type="submit"
								>
									Sign in
									{loading ? <LoadingSmall color="text-white-200" /> : null}
								</Button>
							</div>
						</form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col className="text-slate-300" xs="6">
						<Link href="/auth/forgotPassword">Forgot password?</Link>
					</Col>
					<Col className="text-right text-slate-300" xs="6">
						<Link href="/auth/register">Create new account</Link>
					</Col>
				</Row>
			</Col>
		</>
	);
}

Login.layout = Auth;

export default Login;
