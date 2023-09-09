import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteInput from "../../Form/AutoCompleteInput";
import { buyVpn, fetchAdminVpns } from "../../../store/features/vpnSlice";
import { fetchAllCryptoArches } from "../../../store/features/archSlice";

const validationSchema = yup.object().shape({
	vpnId: yup.string().required("Vpn is required"),
	crtptoArchId: yup.string().required("Crypto arch is required"),
});

export default function VpnBuy() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.vpn.loadingAction);
	const snackMessage = useSelector((state) => state.vpn.snackMessage);

	React.useEffect(() => {
		dispatch(fetchAdminVpns());
		dispatch(fetchAllCryptoArches());
	}, []);

	const vpnData = useSelector((state) => state.vpn.data);
	const cryptoArchData = useSelector((state) => state.arch.cryptoData);

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
							className="mb-4"
							fieldName="vpnId"
							labelName="vpnName"
							valueName="id"
							label="Vpn name"
							options={vpnData}
							formik={formik}
							placeholder="Select a vpn"
						/>

						<AutoCompleteInput
							labelShrink
							fieldName="crtptoArchId"
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
