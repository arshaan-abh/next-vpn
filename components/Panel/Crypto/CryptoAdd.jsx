import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "/components/Form/TextInput";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { addCrypto } from "../../../store/features/cryptoSlice";

const validationSchema = yup.object().shape({
	name: yup
		.string()
		.matches(
			/^[A-Za-z\s]+$/,
			"Name can only contain English letters and spaces"
		)
		.required("Name is required"),
	symbol: yup
		.string()
		.matches(
			/^[A-Za-z\s]+$/,
			"Symbol can only contain English letters and spaces"
		)
		.required("Symbol is required"),
});

export default function CryptoAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.arch.loadingAction);
	const snackMessage = useSelector((state) => state.arch.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			name: "",
			symbol: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addCrypto(values));
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
				<span className="btn-inner--text">Add crypto</span>
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Add crypto</h3>
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
							placeholder="Arch name"
							formik={formik}
						/>

						<TextInput
							labelShrink
							className="mb-4"
							fieldName="symbol"
							label="Symbol"
							placeholder="Arch symbol(abr)"
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
