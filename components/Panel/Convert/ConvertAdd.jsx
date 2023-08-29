import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchExchanges } from "../../../store/features/exchangeSlice";
import AutoCompleteInput from "../../Form/AutoCompleteInput";
import { addConvert } from "../../../store/features/convertSlice";
import TextInput from "../../Form/TextInput";

const validationSchema = yup.object().shape({
	exchangeId: yup.string().required("Exchange is required"),
	amount: yup
		.number()
		.typeError("Amount should be a number")
		.required("Amount is required"),
});

export default function ConvertAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.convert.loadingAction);
	const snackMessage = useSelector((state) => state.convert.snackMessage);
	const exchangeData = useSelector((state) => state.exchange.data);

	React.useEffect(() => {
		dispatch(fetchExchanges());
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
			exchangeId: "",
			convertRequest: "",
			amount: null,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addConvert(values));
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
							fieldName="exchangeId"
							labelName="name"
							valueName="id"
							label="Exchange"
							placeholder="Select desired exchange"
							options={exchangeData?.map((item, i) => {
								return {
									id: item?.id,
									name: `${item?.form?.name}(${item?.from?.symbol}) - ${item?.to?.name}(${item?.to?.symbol})`,
								};
							})}
							formik={formik}
						/>

						<TextInput
							labelShrink
							fieldName="amount"
							type="number"
							label="Amount"
							placeholder="Amount of crypto"
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
