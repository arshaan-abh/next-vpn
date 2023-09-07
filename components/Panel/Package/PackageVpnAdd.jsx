import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteInput from "../../Form/AutoCompleteInput";
import { fetchPackages } from "../../../store/features/packageSlice";
import { addPackage, fetchAdminVpns } from "../../../store/features/vpnSlice";

const validationSchema = yup.object().shape({
	packageId: yup.string().required("Package is required"),
});

export default function PackageVpnAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const loadingAction = useSelector((state) => state.vpn.loadingAction);
	const snackMessage = useSelector((state) => state.vpn.snackMessage);

	React.useEffect(() => {
		dispatch(fetchAdminVpns());
	}, []);

	const vpnData = useSelector((state) => state.vpn.data);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			packageId: id,
			vpnId: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addPackage(values));
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
					<h3>Add vpn to package</h3>
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
							fieldName="vpnId"
							labelName="vpnName"
							valueName="id"
							label="Vpn name"
							options={vpnData}
							formik={formik}
							labelShrink
							placeholder="Select a vpn"
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
