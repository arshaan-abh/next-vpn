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
import UserVpnTable from "../../components/Panel/Vpn/UserVpnTable";
import VpnBuy from "../../components/Panel/Vpn/VpnBuy";

function Vpn() {
	const router = useRouter();

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Vpns</h3>
								<VpnBuy />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<UserVpnTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Vpn.layout = User;

export default Vpn;
