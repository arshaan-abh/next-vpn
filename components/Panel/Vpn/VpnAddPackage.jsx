import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { updateVpn } from "../../../store/features/vpnSlice";
import AutoCompleteInput from "../../Form/AutoCompleteInput";
import { fetchPackages } from "../../../store/features/packageSlice";

const validationSchema = yup.object().shape({
	packageId: yup.string().required("Package is required"),
});

export default function VpnAddPackage({ id }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.vpn.loadingAction);
	const snackMessage = useSelector((state) => state.vpn.snackMessage);

	React.useEffect(() => {
		dispatch(fetchPackages());
	}, []);

	const packageData = useSelector((state) => state.package.data);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			packageId: "",
			vpnId: id,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(updateVpn({ id: currentValue.id, data: values }));
		},
	});

	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<>
			<Button
				size="sm"
				outline
				color="primary"
				type="button"
				onClick={() => {
					setModalOpen(!modalOpen);
					dispatch(fetchPackages());
				}}
			>
				Add to package
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Add to package</h3>
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
							fieldName="packageName"
							labelName="title"
							valueName="id"
							label="Package name"
							options={packageData}
							formik={formik}
							labelShrink
							placeholder="VIP Package"
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
						Add
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
