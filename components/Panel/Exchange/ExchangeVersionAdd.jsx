import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import TextInput from "/components/Form/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { addExchangeVersion } from "../../../store/features/exchangeSlice";

const validationSchema = yup.object().shape({
	from_to: yup
		.number()
		.typeError("This should be a number")
		.required("This field is required"),
	to_from: yup
		.number()
		.typeError("This should be a number")
		.required("This field is required"),
});

export default function ExchangeVersionAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

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
			exchange_Id: id,
			from_to: "",
			to_from: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addExchangeVersion(values));
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
				<span className="btn-inner--text">Add exchange version</span>
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Add exchange version</h3>
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
					<Button color="success" type="submit" onClick={formik.handleSubmit}>
						Add
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
