import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePackageCryptoArch } from "../../../store/features/packageSlice";

export default function PackageCryptoArchDelete({ id }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.package.loadingAction);
	const snackMessage = useSelector((state) => state.package.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [modalOpen, setModalOpen] = React.useState(false);

	const handleDelete = () => {
		dispatch(deletePackageCryptoArch(id));
	};

	return (
		<>
			<Button
				size="sm"
				outline
				color="danger"
				type="button"
				onClick={() => setModalOpen(!modalOpen)}
			>
				Delete
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Delete package crypto arch</h3>
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
					Are you sure you want to delete this package crypto arch?
				</ModalBody>
				<ModalFooter>
					<Button
						color="secondary"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						Close
					</Button>
					<Button color="danger" type="submit" onClick={handleDelete}>
						Delete
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
