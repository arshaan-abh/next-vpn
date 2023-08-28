import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../store/features/userSlice";

export default function UserDelete({ id }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.user.loadingAction);
	const snackMessage = useSelector((state) => state.user.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [modalOpen, setModalOpen] = React.useState(false);

	const handleDelete = () => {
		dispatch(deleteUser(id));
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
					<h3>Delete user</h3>
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<ModalBody>Are you sure you want to delete this user?</ModalBody>
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
