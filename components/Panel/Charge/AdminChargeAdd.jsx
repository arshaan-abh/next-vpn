import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteInput from "../../Form/AutoCompleteInput";
import { fetchArches } from "../../../store/features/archSlice";
import { fetchAdminCryptos } from "../../../store/features/cryptoSlice";
import TextInput from "../../Form/TextInput";
// import ToggleInput from "../../Form/ToggleInput";
import { addAdminCharge } from "../../../store/features/chargeSlice";

const validationSchema = yup.object().shape({
	archId: yup.string().required("Arch is required"),
	cryptoId: yup.string().required("Crypto is required"),
	amount: yup
		.number()
		.typeError("Amount should be a number")
		.required("Amount is required"),
	status: yup.boolean(),
});

export default function AdminChargeAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { username } = router.query;

	const data = useSelector((state) => state.charge.data).find(
		(item) => item.username === username
	);

	const loadingAction = useSelector((state) => state.charge.loadingAction);
	const snackMessage = useSelector((state) => state.charge.snackMessage);
	const archData = useSelector((state) => state.arch.data);
	const cryptoData = useSelector((state) => state.crypto.data);

	React.useEffect(() => {
		dispatch(fetchArches());
		dispatch(fetchAdminCryptos());
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
			archId: "",
			cryptoId: "",
			userId: data?.userId,
			status: true,
			amount: 0,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addAdminCharge(values));
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
				<span className="btn-inner--text">Charge wallet</span>
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Charge {username}&apos;s wallet</h3>
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
							fieldName="archId"
							labelName="name"
							valueName="id"
							label="Arch"
							placeholder="Select an arch"
							options={archData}
							formik={formik}
						/>

						<AutoCompleteInput
							labelShrink
							className="mb-4"
							fieldName="cryptoId"
							labelName="name"
							valueName="id"
							label="Crypto"
							placeholder="Select a crypto"
							options={cryptoData}
							formik={formik}
						/>

						<TextInput
							labelShrink
							// className="mb-4"
							type="number"
							fieldName="amount"
							label="Amount"
							placeholder="Amount of crypto"
							formik={formik}
						/>

						{/* <ToggleInput
							className="mt-3"
							fieldName="status"
							label="Active"
							options={[
								{ label: "Yes", value: true },
								{ label: "No", value: false },
							]}
							formik={formik}
						/> */}
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
						Charge
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
