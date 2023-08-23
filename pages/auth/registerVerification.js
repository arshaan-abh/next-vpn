import * as React from "react";

// reactstrap components
import { Button, Card, CardBody, Col } from "reactstrap";
// layout for this page
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../../components/Form/TextInput";
import { useDispatch, useSelector } from "react-redux";
import {
	emailResend,
	emailVerify,
	registerActions,
} from "../../store/features/registerSlice";
import LoadingSmall from "../../components/Dynamic/LoadingSmall";
import SnackAlert from "../../components/Dynamic/SnackAlert";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";

const validationSchema = yup.object().shape({
	token: yup
		.string()
		.matches(
			/^[A-Za-z0-9]+$/,
			"Token can only contain English letters and numbers"
		)
		.required("Token is required"),
});

function RegisterVerification() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			token: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(emailVerify(values)).unwrap();
		},
	});

	const dispatch = useDispatch();

	const loading = useSelector((state) => state.register.loading);
	const error = useSelector((state) => state.register.error);
	const snackMessage = useSelector((state) => state.register.snackMessage);
	const stage = useSelector((state) => state.register.stage);

	React.useEffect(() => {
		const email = getLocalStorageItem("verifyemail");
		if (!email) router.push("/auth/register");
	}, []);

	React.useEffect(() => {
		if (stage === "verify") {
			router.push("/auth/login");
			dispatch(registerActions.clearStage());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage]);

	React.useEffect(() => {
		if (snackMessage != "") handleOpenSnack();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = (text) => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(registerActions.clearSnackMessage());
	};

	const [timer, setTimer] = React.useState(180);

	React.useEffect(() => {
		let countdownTimer;
		if (timer > 0) {
			countdownTimer = setTimeout(() => setTimer(timer - 1), 1000);
		}
		return () => clearTimeout(countdownTimer);
	}, [timer]);

	const handleResend = () => {
		dispatch(emailResend()).unwrap();
		setTimer(180);
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
							Verify your email
						</div>
						<form onSubmit={formik.handleSubmit}>
							<TextInput
								labelShrink
								fieldName="token"
								placeholder="Received token from your email"
								label="Verification token"
								formik={formik}
							/>
							{formik.touched.token && !formik.errors.token ? (
								<Button
									disabled={loading}
									className="mt-4 !flex flex-row mx-auto align-items-center h-12"
									color="primary"
									type="submit"
								>
									Verify email
									{loading ? <LoadingSmall color="text-white-200" /> : null}
								</Button>
							) : (
								<Button
									className="mt-4 !flex flex-row mx-auto align-items-center h-12"
									color="primary"
									disabled={timer !== 0 || loading}
									onClick={handleResend}
								>
									{timer === 0 ? (
										<>Resend code</>
									) : (
										<>
											{Math.floor(timer / 60)}:
											{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
										</>
									)}
								</Button>
							)}
						</form>
					</CardBody>
				</Card>
			</Col>
		</>
	);
}

RegisterVerification.layout = Auth;

export default RegisterVerification;
