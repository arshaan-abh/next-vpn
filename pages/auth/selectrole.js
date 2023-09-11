import * as React from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import AutoCompleteInput from "../../components/Form/AutoCompleteInput";
import { useDispatch, useSelector } from "react-redux";
import { loginActions, addRole } from "../../store/features/loginSlice";
import LoadingSmall from "../../components/Dynamic/LoadingSmall";
import SnackAlert from "../../components/Dynamic/SnackAlert";
import {
	clearLocalStorage,
	getLocalStorageItem,
	removeLocalStorageItem,
} from "../../utils/handleLocalStorage";

const validationSchema = yup.object().shape({
	id: yup.string().required("Role is required"),
});

function SelectRole() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loading = useSelector((state) => state.login.loading);
	const stage = useSelector((state) => state.login.stage);
	const snackMessage = useSelector((state) => state.login.snackMessage);

	const [roles, setRoles] = React.useState([]);

	const formik = useFormik({
		initialValues: {
			id: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addRole(values)).unwrap();
		},
	});

	React.useEffect(() => {
		const token = getLocalStorageItem("token");
		if (!token) router.push("/auth/login");

		const storedRoles = getLocalStorageItem("roles");
		setRoles(storedRoles);
	}, []);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	React.useEffect(() => {
		if (stage === "roleadd") {
			let role = roles.find((item) => item._id === formik.values.id).name;
			const paymentmethod = getLocalStorageItem("paymentmethod");

			if (!paymentmethod) {
				if (role === "user") {
					router.push("/panel");
				} else if (role === "admin") {
					router.push("/panel/admin");
				}
			} else {
				removeLocalStorageItem("paymentmethod");
				router.push(`/shop/transaction/${paymentmethod}`);
			}

			dispatch(loginActions.clearStage());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
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
							<AutoCompleteInput
								labelShrink
								className="mb-4"
								fieldName="id"
								labelName="name"
								valueName="_id"
								label="Role"
								placeholder="Select a role"
								options={roles}
								formik={formik}
							/>

							<Button
								disabled={loading}
								className="mt-4 !flex flex-row mx-auto align-items-center h-12"
								color="primary"
								type="submit"
							>
								Open panel
								{loading ? <LoadingSmall color="text-white-200" /> : null}
							</Button>
						</form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col className="text-slate-300" xs="6">
						<div
							className="cursor-pointer"
							onClick={() => {
								clearLocalStorage();
								router.push("/auth/login");
							}}
						>
							Logout from account
						</div>
					</Col>
					<Col className="text-right" xs="6"></Col>
				</Row>
			</Col>
		</>
	);
}

SelectRole.layout = Auth;

export default SelectRole;
