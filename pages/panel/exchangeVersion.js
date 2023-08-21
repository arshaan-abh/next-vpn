import React, { useState } from "react";
import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Container,
	Modal,
	ModalBody,
	ModalFooter,
	Pagination,
	PaginationItem,
	PaginationLink,
	Row,
	Table,
} from "reactstrap";
import User from "/layouts/User.js";
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import AutoCompleteInput from "../../components/Form/AutoCompleteInput";

const validationSchema = yup.object().shape({
	from: yup.string().required("This field is required"),
	to: yup.string().required("This field is required"),
});

function ExchangeVersion() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			from: "",
			to: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const [modalOpen, setModalOpen] = useState(false);
	const coins = ["BNB", "BTC", "ZED", "USDT"];

	return (
		<>
			<Header />
			<Container className="mt--7" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Exchange Version</h3>
								<Button
									color="primary"
									size="sm"
									onClick={() => setModalOpen(!modalOpen)}
								>
									<span className="btn-inner--icon">
										<i className="ni ni-fat-add"></i>
									</span>
									<span className="btn-inner--text">Add Exchange Version</span>
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
										<th scope="col">From Crypto</th>
										<th scope="col">To Crypto</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>TXid</td>
										<td>1402/05/05</td>
									</tr>
									<tr>
										<td>TXid</td>
										<td>1402/05/05</td>
									</tr>
									<tr>
										<td>TXid</td>
										<td>1402/05/05</td>
									</tr>
									<tr>
										<td>TXid</td>
										<td>1402/05/05</td>
									</tr>
									<tr>
										<td>TXid</td>
										<td>1402/05/05</td>
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
					<h3>Add exchange version</h3>
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
							fieldName="from"
							label="From"
							options={coins}
							formik={formik}
						/>

						<AutoCompleteInput
							labelShrink
							fieldName="to"
							label="To"
							options={coins}
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

ExchangeVersion.layout = User;

export default ExchangeVersion;
