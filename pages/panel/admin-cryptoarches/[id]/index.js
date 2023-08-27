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
import CryptoArchAdd from "../../../../components/Panel/Arch/CryptoArchAdd";
import CryptoArchTable from "../../../../components/Panel/Arch/CryptoArchTable";

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
								<h3 className="mb-0">Crypto arch</h3>
								<CryptoArchAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<CryptoArchTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Page.layout = Admin;

export default Page;
