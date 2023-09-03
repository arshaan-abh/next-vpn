import React from "react";
import {
	Card,
	CardHeader,
	Container,
	Row,
} from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import ExchangeVersionAdd from "../../../../components/Panel/Exchange/ExchangeVersionAdd";
import ExchangeVersionTable from "../../../../components/Panel/Exchange/ExchangeVersionTable";

function Page() {
	const router = useRouter();

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Exchange versions</h3>
								<ExchangeVersionAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<ExchangeVersionTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Page.layout = Admin;

export default Page;
