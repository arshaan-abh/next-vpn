import * as React from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import SelectInput from "@mui/material/Select/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { login, loginActions } from "../../store/features/loginSlice";
import LoadingSmall from "../../components/Dynamic/LoadingSmall";
import SnackAlert from "../../components/Dynamic/SnackAlert";

const validationSchema = yup.object().shape({
	role: yup.string().required("Role is required"),
});

function SelectRole() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loading = useSelector((state) => state.login.loading);
	const stage = useSelector((state) => state.login.stage);
	const snackMessage = useSelector((state) => state.login.snackMessage);
	const roles = getLocalStorageItem("roles");
	const roleNames = roles.map((item, i) => item.name);

	const formik = useFormik({
		initialValues: {
			role: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			let temp = values;
			delete temp["rememberme"];
			dispatch(login(temp)).unwrap();
		},
	});

	React.useEffect(() => {
		const token = getLocalStorageItem("token");
		if (!token) router.push("/auth/login");
	}, []);

	React.useEffect(() => {
		if (snackMessage != "") handleOpenSnack();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	React.useEffect(() => {
		if (stage === "roleadd") {
			router.push("/panel");
			dispatch(loginActions.clearStage());
		}
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
							Select role
						</div>
						<form onSubmit={formik.handleSubmit}>
							<SelectInput
								labelShrink
								className="mb-4"
								fieldName="role"
								placeholder="Select desired role"
								label="Role"
								options={[]}
								formik={formik}
							/>

							<div className="text-center">
								<Button
									disabled={loading}
									className="mt-4 !flex flex-row align-items-center h-12"
									color="primary"
									type="submit"
								>
									Open panel
									{loading ? <LoadingSmall color="text-white-200" /> : null}
								</Button>
							</div>
						</form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col className="text-slate-300" xs="6">
						<Link href="/auth/login">Logout from account</Link>
					</Col>
					<Col className="text-right" xs="6"></Col>
				</Row>
			</Col>
		</>
	);
}

SelectRole.layout = Auth;

export default SelectRole;
