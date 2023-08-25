import React, { useState } from "react";
import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Container,
	Form,
	FormGroup,
	Input,
	Media,
	Modal,
	ModalBody,
	ModalFooter,
	Pagination,
	PaginationItem,
	PaginationLink,
	Row,
	Table,
} from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import Image from "next/future/image";
import bootstrap from "/assets/img/theme/bootstrap.jpg";
import angular from "/assets/img/theme/angular.jpg";
import sketch from "/assets/img/theme/sketch.jpg";
import react from "/assets/img/theme/react.jpg";
import vue from "/assets/img/theme/vue.jpg";
import { useRouter } from "next/router";

function RollFront() {
	const router = useRouter();
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Rolls Front</h3>
								<Button
									color="primary"
									size="sm"
									onClick={() => setModalOpen(!modalOpen)}
								>
									<span className="btn-inner--icon">
										<i className="ni ni-fat-add"></i>
									</span>
									<span className="btn-inner--text">Add Roll Front</span>
								</Button>
								<Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button>
							</CardHeader>
							<Table className="text-left table-flush" responsive>
								<thead className="thead-light">
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Route</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">
											<Media className="align-items-center">
												<a
													className="avatar rounded-circle mr-3"
													href="#pablo"
													onClick={(e) => e.preventDefault()}
												>
													<Image alt="..." src={bootstrap} />
												</a>
												<Media>
													<span className="mb-0 text-sm">
														Argon Design System
													</span>
												</Media>
											</Media>
										</th>
										<td>Route one</td>
									</tr>
									<tr>
										<th scope="row">
											<Media className="align-items-center">
												<a
													className="avatar rounded-circle mr-3"
													href="#pablo"
													onClick={(e) => e.preventDefault()}
												>
													<Image alt="..." src={angular} />
												</a>
												<Media>
													<span className="mb-0 text-sm">
														Argon Design System
													</span>
												</Media>
											</Media>
										</th>
										<td>Route one</td>
									</tr>
									<tr>
										<th scope="row">
											<Media className="align-items-center">
												<a
													className="avatar rounded-circle mr-3"
													href="#pablo"
													onClick={(e) => e.preventDefault()}
												>
													<Image alt="..." src={sketch} />
												</a>
												<Media>
													<span className="mb-0 text-sm">Black Dashboard</span>
												</Media>
											</Media>
										</th>
										<td>Route one</td>
									</tr>
									<tr>
										<th scope="row">
											<Media className="align-items-center">
												<a
													className="avatar rounded-circle mr-3"
													href="#pablo"
													onClick={(e) => e.preventDefault()}
												>
													<Image alt="..." src={react} />
												</a>
												<Media>
													<span className="mb-0 text-sm">
														Argon Design System
													</span>
												</Media>
											</Media>
										</th>
										<td>Route one</td>
									</tr>
									<tr>
										<th scope="row">
											<Media className="align-items-center">
												<a
													className="avatar rounded-circle mr-3"
													href="#pablo"
													onClick={(e) => e.preventDefault()}
												>
													<Image alt="..." src={vue} />
												</a>
												<Media>
													<span className="mb-0 text-sm">
														Argon Design System
													</span>
												</Media>
											</Media>
										</th>
										<td>Route one</td>
									</tr>
								</tbody>
							</Table>
							<CardFooter className="py-4">
								<nav aria-label="...">
									<div className="flex gap-4 items-center">
										<div className="grow"></div>
										<Pagination
											className="pagination justify-content-end mb-0"
											listClassName="justify-content-end mb-0"
										>
											<PaginationItem className="disabled">
												<PaginationLink
													href="#pablo"
													onClick={(e) => e.preventDefault()}
													tabIndex="-1"
												>
													<i className="fas fa-angle-left" />
													<span className="sr-only">Previous</span>
												</PaginationLink>
											</PaginationItem>
											<PaginationItem className="active">
												<PaginationLink
													href="#pablo"
													onClick={(e) => e.preventDefault()}
												>
													1
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink
													href="#pablo"
													onClick={(e) => e.preventDefault()}
												>
													2 <span className="sr-only">(current)</span>
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink
													href="#pablo"
													onClick={(e) => e.preventDefault()}
												>
													3
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink
													href="#pablo"
													onClick={(e) => e.preventDefault()}
												>
													<i className="fas fa-angle-right" />
													<span className="sr-only">Next</span>
												</PaginationLink>
											</PaginationItem>
										</Pagination>
									</div>
								</nav>
							</CardFooter>
						</Card>
					</div>
				</Row>
			</Container>
			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				<div className="modal-header">
					<h3>Add roll front</h3>
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
					<Form>
						<FormGroup>
							<label className="form-control-label" htmlFor="roll-name">
								Name
							</label>
							<Input placeholder="Name here" id="roll-name" type="text"></Input>
						</FormGroup>
						<FormGroup className="mb-0">
							<label className="form-control-label" htmlFor="roll-route">
								Route
							</label>
							<Input
								placeholder="Route here"
								id="roll-route"
								type="text"
							></Input>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						color="secondary"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						Close
					</Button>
					<Button color="primary" type="button">
						Add
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}

RollFront.layout = Admin;

export default RollFront;
