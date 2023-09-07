import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export default function VpnDetail({ username, currentValue }) {
	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<>
			<Button
				size="sm"
				outline
				color="success"
				type="button"
				onClick={() => setModalOpen(!modalOpen)}
			>
				Detail
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				<div className="modal-header">
					<h3>{username}&apos;s vpn details</h3>
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<ModalBody></ModalBody>
				<ModalFooter>
					<Button
						color="secondary"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
