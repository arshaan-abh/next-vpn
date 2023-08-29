import React from "react";
import { Card, CardHeader, Container, Row } from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import ExchangeTable from "../../components/Panel/Exchange/ExchangeTable";
import ExchangeAdd from "../../components/Panel/Exchange/ExchangeAdd";

function Exchange() {
	const router = useRouter();

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Exchanges</h3>
								<ExchangeAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<ExchangeTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Exchange.layout = Admin;

export default Exchange;
