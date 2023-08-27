import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "/components/Form/TextInput";
import ToggleInput from "../../Form/ToggleInput";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { addRole, fetchRoles } from "../../../store/features/roleSlice";

const validationSchema = yup.object().shape({
	name: yup
		.string()
		.matches(
			/^[A-Za-z\s]+$/,
			"Name can only contain English letters and spaces"
		)
		.required("Name is required"),
	status: yup.boolean(),
	isDefault: yup.boolean(),
});

export default function RoleAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.role.loadingAction);
	const snackMessage = useSelector((state) => state.role.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
			dispatch(fetchRoles());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			name: "",
			status: true,
			isDefault: false,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addRole(values));
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
				<span className="btn-inner--text">Add Roll</span>
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Add role</h3>
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
							placeholder="Role name"
							formik={formik}
						/>

						<ToggleInput
							className="mb-4"
							fieldName="status"
							options={[
								{ label: "Active", value: true },
								{ label: "Inactive", value: false },
							]}
							formik={formik}
						/>

						<ToggleInput
							fieldName="isDefault"
							options={[
								{ label: "Normal", value: false },
								{ label: "Default", value: true },
							]}
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
