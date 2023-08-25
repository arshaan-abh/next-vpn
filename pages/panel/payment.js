import React from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Input,
	Modal,
	Row,
} from "reactstrap";
import User from "/layouts/User.js";
import Header from "/components/Headers/Header.js";
import Image from "next/future/image";
import vpn from "/public/assets/vpn-config.jpg";

const Payment = () => {
	const [modalNotificationOpen, setModalNotificationOpen] =
		React.useState(false);

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<Col className="mb-5 mb-xl-0" xl="8">
						<Card className="shadow">
							<CardHeader className="bg-transparent">
								<Row className="align-items-center">
									<div className="col">
										<h6 className="text-uppercase text-muted ls-1 mb-1">
											Payment
										</h6>
										<h2 className="mb-0">Verify your payment</h2>
									</div>
								</Row>
							</CardHeader>
							<CardBody className="flex flex-col">
								<div className="mb-4">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Et ligula ullamcorper malesuada proin.
								</div>
								<div className="flex flex-col sm:flex-row items-start justify-center gap-4 p-4 bg-secondary">
									<Input
										className="form-control-alternative"
										placeholder="Address here"
										type="text"
									/>
									<Button
										className="btn-icon btn-3 shrink-0"
										color="primary"
										type="button"
										onClick={() => setModalNotificationOpen(true)}
									>
										<span className="btn-inner--icon">
											<i className="ni ni-active-40"></i>
										</span>
										<span className="btn-inner--text">Verify</span>
									</Button>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl="4">
						<Card className="shadow overflow-hidden">
							<Image src={vpn} alt="..." />
						</Card>
					</Col>
				</Row>
			</Container>
			<Modal
				centered
				isOpen={modalNotificationOpen}
				className="modal-success"
				contentClassName="bg-gradient-success"
			>
				<div className="modal-header">
					<h3 className="modal-title" id="modal-title-notification">
						Your attention is required
					</h3>
					<button
						aria-label="Close"
						className="close"
						onClick={() => setModalNotificationOpen(false)}
						type="button"
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<div className="modal-body">
					<div className="py-3 text-center">
						<i className="ni ni-bell-55 ni-3x"></i>
						<h4 className="heading mt-4">Verified!</h4>
						<p className="text-white">
							The code you sent is verified and good to go.
						</p>
					</div>
				</div>
				<div className="modal-footer">
					<Button
						className="btn-white"
						color="default"
						type="button"
						onClick={() => setModalNotificationOpen(false)}
					>
						Ok, Got it
					</Button>
					<Button
						className="text-white ml-auto"
						color="link"
						onClick={() => setModalNotificationOpen(false)}
						type="button"
					>
						Close
					</Button>
				</div>
			</Modal>
		</>
	);
};

Payment.layout = User;

export default Payment;
