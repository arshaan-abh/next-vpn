import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteInput from "../../Form/AutoCompleteInput";
import { buyVpn } from "../../../store/features/vpnSlice";
import { fetchAllPackageCryptoArches } from "../../../store/features/packageSlice";

const validationSchema = yup.object().shape({
	packageCryptoArchId: yup.string().required("Package crypto arch is required"),
});

export default function VpnBuy() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.vpn.loadingAction);
	const snackMessage = useSelector((state) => state.vpn.snackMessage);

	React.useEffect(() => {
		dispatch(fetchAllPackageCryptoArches());
	}, []);

	const packageCryptoArchData = useSelector(
		(state) => state.package.cryptoData
	);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: { vpnId: "", crtptoArchId: "" },
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(buyVpn(values));
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
				<span className="btn-inner--icon">
					<i className="ni ni-fat-add"></i>
				</span>
				<span className="btn-inner--text">Buy Vpn</span>
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Buy a vpn</h3>
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
							fieldName="packageCryptoArchId"
							labelName="name"
							valueName="id"
							label="Package, network and crypto"
							placeholder="Select a package"
							options={packageCryptoArchData?.map((item, i) => {
								return {
									id: item?.id,
									name: `${item?.package?.title} - ${item?.cryptoArch?.arch?.name}(${item?.cryptoArch?.arch?.symbol}) - ${item?.cryptoArch?.crypto?.name}(${item?.cryptoArch?.crypto?.symbol}) x ${item?.price}`,
								};
							})}
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
						Buy
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
