import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePackage } from "../../../store/features/packageSlice";

export default function PackageDelete({ id }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.crypto.loadingAction);
	const snackMessage = useSelector((state) => state.crypto.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [modalOpen, setModalOpen] = React.useState(false);

	const handleDelete = () => {
		dispatch(deletePackage(id));
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
					<h3>Delete package</h3>
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<ModalBody>Are you sure you want to delete this package?</ModalBody>
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
