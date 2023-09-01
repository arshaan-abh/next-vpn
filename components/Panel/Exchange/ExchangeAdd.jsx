import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import ToggleInput from "../../Form/ToggleInput";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptos } from "../../../store/features/cryptoSlice";
import { addExchange } from "../../../store/features/exchangeSlice";
import AutoCompleteInput from "../../Form/AutoCompleteInput";

const validationSchema = yup.object().shape({
	fromId: yup.string().required("From is required"),
	toId: yup
		.string()
		.notOneOf([yup.ref("fromId")], "To cannot be the same as From")
		.required("To is required"),
	status: yup.boolean(),
});

export default function ExchangeAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.exchange.loadingAction);
	const snackMessage = useSelector((state) => state.exchange.snackMessage);
	const cryptoData = useSelector((state) => state.crypto.data);

	React.useEffect(() => {
		dispatch(fetchCryptos());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			fromId: "",
			toId: "",
			status: true,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addExchange(values));
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
				<span className="btn-inner--text">Add exchange</span>
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Add exchange</h3>
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
						<AutoCompleteInput
							labelShrink
							className="mb-4"
							fieldName="fromId"
							labelName="name"
							valueName="id"
							label="From"
							placeholder="Select a crypto"
							options={cryptoData?.map((item, i) => {
								return {
									id: item?.id,
									name: `${item?.name}(${item?.symbol})`,
								};
							})}
							formik={formik}
						/>

						<AutoCompleteInput
							labelShrink
							className="mb-4"
							fieldName="toId"
							labelName="name"
							valueName="id"
							label="To"
							placeholder="Select a crypto"
							options={cryptoData?.map((item, i) => {
								return {
									id: item?.id,
									name: `${item?.name}(${item?.symbol})`,
								};
							})}
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
