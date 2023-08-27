import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "/components/Form/TextInput";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoArches, updateCryptoArch } from "../../../store/features/archSlice";
import ToggleInput from "../../Form/ToggleInput";

const validationSchema = yup.object().shape({
	idSmartContract: yup.string().required("Smart contract ID is required"),
	decimal: yup
		.number()
		.typeError("Decimal should be a number")
		.required("Decimal is required"),
	isStableCoin: yup.boolean().required(),
	isCoin: yup.boolean().required(),
});

export default function CryptoArchEdit({ currentValue }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const loadingAction = useSelector((state) => state.arch.loadingAction);
	const snackMessage = useSelector((state) => state.arch.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
			dispatch(fetchCryptoArches({ id }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			idSmartContract: currentValue.idSmartContract,
			decimal: currentValue.decimal,
			isStableCoin: currentValue.isStableCoin,
			isCoin: currentValue.isCoin,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(updateCryptoArch({ id: currentValue.id, data: values }));
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
					<h3>Edit crypto</h3>
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
					<Button color="warning" type="submit" onClick={formik.handleSubmit}>
						Edit
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
