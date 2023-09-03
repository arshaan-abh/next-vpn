import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { updateExchangeVersion } from "../../../store/features/exchangeSlice";
import TextInput from "/components/Form/TextInput";

const validationSchema = yup.object().shape({
	status: yup.boolean(),
});

export default function ExchangeVersionEdit({ currentValue }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.exchange.loadingAction);
	const snackMessage = useSelector((state) => state.exchange.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			from_to: currentValue.from_to,
			to_from: currentValue.to_from,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(updateExchangeVersion({ id: currentValue.id, data: values }));
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
					<h3>Edit exchange version</h3>
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
							fieldName="from_to"
							type="number"
							label="From to"
							placeholder="From to multiplier"
							formik={formik}
						/>

						<TextInput
							labelShrink
							className="mb-4"
							fieldName="to_from"
							type="number"
							label="To from"
							placeholder="To from multiplier"
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
