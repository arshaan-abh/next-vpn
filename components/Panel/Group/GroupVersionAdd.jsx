import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import TextInput from "/components/Form/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPackageCryptoArches } from "../../../store/features/packageSlice";
import { addGroupVersion } from "../../../store/features/groupSlice";
import AutoCompleteInput from "../../Form/AutoCompleteInput";

const validationSchema = yup.object().shape({
	packageVersionId: yup.string().required("Package crypto arch is required"),
	discount: yup
		.number()
		.typeError("Discount should be a number")
		.required("Discount is required"),
});

export default function GroupVersionAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const loadingAction = useSelector((state) => state.group.loadingAction);
	const snackMessage = useSelector((state) => state.group.snackMessage);
	const packageCryptoArchData = useSelector(
		(state) => state.package.cryptoData
	);

	React.useEffect(() => {
		dispatch(fetchAllPackageCryptoArches());
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
			packageVersionId: "",
			groupId: id,
			discount: 12,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addGroupVersion(values));
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
				<span className="btn-inner--text">Add group version</span>
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Add group version</h3>
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
							fieldName="packageVersionId"
							labelName="name"
							valueName="id"
							label="Package crypto arch"
							placeholder="Select a Package crypto arch"
							options={packageCryptoArchData?.map((item, i) => {
								return {
									id: item?.id,
									name: `${item?.package?.title} - ${item?.cryptoArch?.arch?.name}(${item?.cryptoArch?.arch?.symbol}) - ${item?.cryptoArch?.crypto?.name}(${item?.cryptoArch?.crypto?.symbol}) x ${item?.price}`,
								};
							})}
							formik={formik}
						/>

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
					<Button color="success" type="submit" onClick={formik.handleSubmit}>
						Add
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
