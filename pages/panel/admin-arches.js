import React, { useState } from "react";
import {
	Badge,
	Button,
	Card,
	CardFooter,
	CardHeader,
	Container,
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
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "/components/Form/TextInput";
import ToggleInput from "../../components/Form/ToggleInput";

const validationSchema = yup.object().shape({
	name: yup
		.string()
		.matches(
			/^[A-Za-z\s]+$/,
			"Name can only contain English letters and spaces"
		)
		.required("Name is required"),
	symbol: yup
		.string()
		.matches(
			/^[A-Za-z\s]+$/,
			"Symbol can only contain English letters and spaces"
		)
		.required("Symbol is required"),
	status: yup.string().required("Status is required"),
});

function Arches() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			name: "",
			symbol: "",
			status: "Enable",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<Header />
			<Container className="mt--7" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Arches</h3>
								<Button
									color="primary"
									size="sm"
									onClick={() => setModalOpen(!modalOpen)}
								>
									<span className="btn-inner--icon">
										<i className="ni ni-fat-add"></i>
									</span>
									<span className="btn-inner--text">Add Arch</span>
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
										<th scope="col">Symbol</th>
										<th scope="col">Status</th>
										<th scope="col" />
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
										<td>...</td>
										<td>
											<Badge color="" className="badge-dot mr-4">
												<i className="bg-warning" />
												pending
											</Badge>
										</td>
										<td className="text-right">
											<Button
												size="sm"
												outline
												color="info"
												type="button"
												onClick={() => router.push("/panel/admin-archesCrypto")}
											>
												Crypto
											</Button>
										</td>
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
										<td>...</td>
										<td>
											<Badge color="" className="badge-dot">
												<i className="bg-success" />
												completed
											</Badge>
										</td>
										<td className="text-right">
											<Button
												size="sm"
												outline
												color="info"
												type="button"
												onClick={() => router.push("/panel/admin-archesCrypto")}
											>
												Crypto
											</Button>
										</td>
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
										<td>...</td>
										<td>
											<Badge color="" className="badge-dot mr-4">
												<i className="bg-danger" />
												delayed
											</Badge>
										</td>
										<td className="text-right">
											<Button
												size="sm"
												outline
												color="info"
												type="button"
												onClick={() => router.push("/panel/admin-archesCrypto")}
											>
												Crypto
											</Button>
										</td>
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
										<td>...</td>
										<td>
											<Badge color="" className="badge-dot">
												<i className="bg-info" />
												on schedule
											</Badge>
										</td>
										<td className="text-right">
											<Button
												size="sm"
												outline
												color="info"
												type="button"
												onClick={() => router.push("/panel/admin-archesCrypto")}
											>
												Crypto
											</Button>
										</td>
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
										<td>...</td>
										<td>
											<Badge color="" className="badge-dot mr-4">
												<i className="bg-success" />
												completed
											</Badge>
										</td>
										<td className="text-right">
											<Button
												size="sm"
												outline
												color="info"
												type="button"
												onClick={() => router.push("/panel/admin-archesCrypto")}
											>
												Crypto
											</Button>
										</td>
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
					<h3>Add arch</h3>
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
						<TextInput
							labelShrink
							className="mb-4"
							fieldName="name"
							label="Name"
							placeholder="Arch name"
							formik={formik}
						/>

						<TextInput
							labelShrink
							className="mb-4"
							fieldName="symbol"
							label="Symbol"
							placeholder="Arch symbol(abr)"
							formik={formik}
						/>

						<ToggleInput
							fieldName="status"
							options={["Enable", "Disable"]}
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
					<Button color="primary" type="submit" onClick={formik.handleSubmit}>
						Add
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}

Arches.layout = Admin;

export default Arches;
