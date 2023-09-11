import * as React from "react";

// reactstrap components
import { Button, Card, CardBody, Col } from "reactstrap";
// layout for this page
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
	emailResend,
	registerActions,
} from "../../store/features/registerSlice";
import SnackAlert from "../../components/Dynamic/SnackAlert";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";

function RegisterVerificationRequest() {
	const router = useRouter();

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
		if (stage === "verified") router.push("/auth/login");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage]);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
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
						<div className="font-bold text-lg text-slate-800">
							Verify your email
						</div>
						<div className="font-normal text-base text-slate-700 py-3">
							Verification link is sent to your email. Follow your account
							registeration steps from there.
						</div>
						<form>
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
						</form>
					</CardBody>
				</Card>
			</Col>
		</>
	);
}

RegisterVerificationRequest.layout = Auth;

export default RegisterVerificationRequest;
