import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "/components/Form/TextInput";
import ToggleInput from "../../Form/ToggleInput";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { updateRole } from "../../../store/features/roleSlice";

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

export default function RoleEdit({ currentValue }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.role.loadingAction);
	const snackMessage = useSelector((state) => state.role.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			name: currentValue.name,
			status: currentValue.status,
			isDefault: currentValue.isDefault,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(updateRole({ id: currentValue.id, data: values }));
		},
	});

	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<>
			<Button
				size="sm"
				outline
				color="warning"
				type="button"
				onClick={() => setModalOpen(!modalOpen)}
			>
				Edit
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Edit role</h3>
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
							className="mt-3 mb-4"
							fieldName="status"
							label="Active"
							options={[
								{ label: "Yes", value: true },
								{ label: "No", value: false },
							]}
							formik={formik}
						/>

						<ToggleInput
							className="mt-3"
							fieldName="isDefault"
							label="Default"
							options={[
								{ label: "Yes", value: true },
								{ label: "No", value: false },
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
					<Button color="warning" type="submit" onClick={formik.handleSubmit}>
						Edit
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
