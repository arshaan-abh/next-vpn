import React from "react";
import {
	Card,
	CardHeader,
	Container,
	Row,
} from "reactstrap";
import User from "/layouts/User.js";
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import UserCryptoTable from "../../components/Panel/Crypto/UserCryptoTable";

function Cryptos() {
	const router = useRouter();

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Cryptos</h3>
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<UserCryptoTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Cryptos.layout = User;

export default Cryptos;
