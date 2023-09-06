import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "/components/Form/TextInput";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { addVpn } from "../../../store/features/vpnSlice";
import PasswordInput from "../../Form/PasswordInput";

const validationSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
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
	privateKey: yup
		.string()
		.matches(
			/^[A-Za-z0-9_]+$/,
			"Private key can only contain letters, numbers, and underscores"
		)
		.required("Private key is required"),
});

export default function VpnAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.vpn.loadingAction);
	const snackMessage = useSelector((state) => state.vpn.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			name: "",
			username: "",
			password: "",
			privateKey: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addVpn(values));
		},
	});

	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<>
			<Button
				color="primary"
				size="sm"
				onClick={() => setModalOpen(!modalOpen)}
			>
				<span className="btn-inner--icon">
					<i className="ni ni-fat-add"></i>
				</span>
				<span className="btn-inner--text">Add Vpn</span>
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Add vpn</h3>
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<ModalBody>
					<form>
						<TextInput
							labelShrink
							className="mb-4"
							fieldName="name"
							label="Name"
							placeholder="Vpn name"
							formik={formik}
						/>

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
							className="mb-4"
							fieldName="password"
							placeholder="Your password"
							label="Password"
							formik={formik}
						/>

						<TextInput
							labelShrink
							fieldName="privateKey"
							placeholder="Package private key"
							label="Private key"
							formik={formik}
						/>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						color="secondary"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						Close
					</Button>
					<Button color="success" type="submit" onClick={formik.handleSubmit}>
						Add
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
