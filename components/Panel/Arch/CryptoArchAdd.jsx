import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "/components/Form/TextInput";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import {
	addCryptoArch,
	fetchCryptoArches,
} from "../../../store/features/archSlice";
import ToggleInput from "../../Form/ToggleInput";

const validationSchema = yup.object().shape({
	cryptoId: yup.string().required("Crypto ID is required"),
	idSmartContract: yup.string().required("Smart contract ID is required"),
	decimal: yup
		.number()
		.typeError("Decimal should be a number")
		.required("Decimal is required"),
	isStableCoin: yup.boolean().required(),
	isCoin: yup.boolean().required(),
});

export default function CryptoArchAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.arch.loadingAction);
	const snackMessage = useSelector((state) => state.arch.snackMessage);

	const { id } = router.query;

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
			dispatch(fetchCryptoArches({ id }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			archId: id,
			cryptoId: "",
			idSmartContract: "",
			decimal: null,
			isStableCoin: false,
			isCoin: true,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addCryptoArch(values));
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
							fieldName="cryptoId"
							label="Crypto ID"
							placeholder="Crypto ID(based on crypto)"
							formik={formik}
						/>

						<TextInput
							labelShrink
							className="mb-4"
							fieldName="idSmartContract"
							label="Smart contract ID"
							placeholder="Smart contract ID(based on crypto)"
							formik={formik}
						/>

						<TextInput
							labelShrink
							className="mb-4"
							fieldName="decimal"
							type="number"
							label="Decimal"
							placeholder="Crypto descimal"
							formik={formik}
						/>

						<ToggleInput
							className="mt-3 mb-4"
							fieldName="isStableCoin"
							label="Is stable coin"
							options={[
								{ label: "Yes", value: true },
								{ label: "No", value: false },
							]}
							formik={formik}
						/>

						<ToggleInput
							className="mt-3"
							fieldName="isCoin"
							label="Is coin"
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
