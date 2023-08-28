import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "/components/Form/TextInput";
import ToggleInput from "../../Form/ToggleInput";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../store/features/userSlice";

const validationSchema = yup.object().shape({
	referralCode: yup
		.string()
		.matches(
			/^[A-Za-z0-9\s]+$/,
			"Referral code can only contain English letters, numbers, and spaces"
		)
		.required("Referral code is required"),
	status: yup.string().required("Status is required"),
});

export default function UserEdit({ currentValue }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.user.loadingAction);
	const snackMessage = useSelector((state) => state.user.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			referralCode: currentValue.referralCode,
			status: currentValue.status,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(updateUser({ id: currentValue.id, data: values }));
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
					<h3>Edit user</h3>
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
							fieldName="referralCode"
							label="Referral code"
							placeholder="User referral code"
							formik={formik}
						/>

						<ToggleInput
							fieldName="status"
							options={[
								{ label: "Active", value: "active" },
								{ label: "Deactive", value: "deactive" },
								{ label: "Pending", value: "pending" },
								{ label: "Blocked", value: "blocked" },
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
