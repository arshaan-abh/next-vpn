import React from "react";
import { Card, CardHeader, Container, Row, Button } from "reactstrap";
import User from "/layouts/User.js";
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import UserVpnTable from "../../components/Panel/Vpn/UserVpnTable";
import VpnBuy from "../../components/Panel/Vpn/VpnBuy";

function Dashboard() {
	const router = useRouter();

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Vpns list</h3>
								<VpnBuy />
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="/files/config.ovpn"
								>
									<Button size="sm" outline color="success" type="button">
										<span className="btn-inner--icon">
											<i className="ni ni-archive-2"></i>
										</span>
										<span className="btn-inner--text">
											Download config file
										</span>
									</Button>
								</a>
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

Dashboard.layout = User;

export default Dashboard;
