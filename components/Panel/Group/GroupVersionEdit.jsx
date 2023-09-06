import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "/components/Form/TextInput";
import { updateGroupVersion } from "../../../store/features/groupSlice";

const validationSchema = yup.object().shape({
	discount: yup
		.number()
		.typeError("Discount should be a number")
		.required("Discount is required"),
});

export default function GroupVersionEdit({ currentValue }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.group.loadingAction);
	const snackMessage = useSelector((state) => state.group.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			discount: currentValue.discount,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(updateGroupVersion({ id: currentValue.id, data: values }));
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
					<h3>Edit group version</h3>
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
							fieldName="discount"
							type="number"
							label="Discount"
							placeholder="Amount of discount"
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
