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
import TextInput from "/components/Form/TextInput";
import AutoCompleteInput from "../../components/Form/AutoCompleteInput";
import ToggleInput from "../../components/Form/ToggleInput";

const validationSchema = yup.object().shape({
	coin: yup.string().required("Coin is required"),
	amount: yup
		.number()
		.typeError("Amount should be a number")
		.test("minimum", "Amount should be bigger than 0", function (value) {
			return value > 0;
		})
		.required("Amount is required"),
	type: yup.string(),
});

function Convert() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			coin: "",
			amount: "",
			type: "buy",
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
								<h3 className="mb-0">Convert</h3>
								<Button
									color="primary"
									size="sm"
									onClick={() => setModalOpen(!modalOpen)}
								>
									<span className="btn-inner--icon">
										<i className="ni ni-fat-add"></i>
									</span>
									<span className="btn-inner--text">Convert</span>
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
										<th scope="col">From crypto</th>
										<th scope="col">To crypto</th>
										<th scope="col">Amount</th>
										<th scope="col">Creation date</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>BNB</td>
										<td>BTC</td>
										<td>24,673,000</td>
										<td>1402/05/05</td>
									</tr>
									<tr>
										<td>BNB</td>
										<td>BTC</td>
										<td>24,673,000</td>
										<td>1402/05/05</td>
									</tr>
									<tr>
										<td>BNB</td>
										<td>BTC</td>
										<td>24,673,000</td>
										<td>1402/05/05</td>
									</tr>
									<tr>
										<td>BNB</td>
										<td>BTC</td>
										<td>24,673,000</td>
										<td>1402/05/05</td>
									</tr>
									<tr>
										<td>BNB</td>
										<td>BTC</td>
										<td>24,673,000</td>
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
					<h3>Convert</h3>
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
							fieldName="coin"
							label="BTC/USDT"
							options={coins}
							formik={formik}
						/>

						<TextInput
							labelShrink
							className="mb-4"
							fieldName="amount"
							type="number"
							label="Amount"
							formik={formik}
						/>

						<ToggleInput
							fieldName="type"
							options={["buy", "sell"]}
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
						Convert
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}

Convert.layout = User;

export default Convert;
