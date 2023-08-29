import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "/components/Form/TextInput";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { updatePackageCryptoArch } from "../../../store/features/packageSlice";
import AutoCompleteInput from "../../Form/AutoCompleteInput";

const validationSchema = yup.object().shape({
	cryptoArchId: yup.string().required("Crypto arch is required"),
	price: yup
		.number()
		.typeError("Price should be a number")
		.required("Price is required"),
});

export default function PackageCryptoArchEdit({ currentValue }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const loadingAction = useSelector((state) => state.package.loadingAction);
	const snackMessage = useSelector((state) => state.package.snackMessage);
	const cryptoArchData = useSelector((state) => state.arch.cryptoData);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			packageId: id,
			cryptoArchId: currentValue.cryptoArch.id,
			price: currentValue.price,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(updatePackageCryptoArch({ id: currentValue.id, data: values }));
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
					<h3>Edit package crypto arch</h3>
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
							fieldName="cryptoArchId"
							labelName="name"
							valueName="id"
							label="Crypto arch"
							placeholder="Select a crypto arch"
							options={
								cryptoArchData[0]
									? cryptoArchData[0]?.map((item, i) => {
											return {
												id: item?.id,
												name: `${item?.arch?.name}(${item?.arch?.symbol}) - ${item?.crypto?.name}(${item?.crypto?.symbol})`,
											};
									  })
									: []
							}
							formik={formik}
						/>

						<TextInput
							labelShrink
							className="mb-4"
							fieldName="price"
							type="number"
							label="Price"
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
					<Button color="warning" type="submit" onClick={formik.handleSubmit}>
						Edit
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
