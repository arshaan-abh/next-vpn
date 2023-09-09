import React from "react";
import { Card, CardHeader, Container, Row, Button } from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import ReportVpnTable from "../../../../components/Panel/Vpn/ReportVpnTable";

function Page() {
	const router = useRouter();

	const { username } = router.query;

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">{username}&apos;s vpns</h3>
								<Button
									color="danger"
									size="sm"
									onClick={() => router.push("/panel/admin-uservpn")}
								>
									<span className="btn-inner--icon">
										<i className="ni ni-bold-left"></i>
									</span>
									<span className="btn-inner--text">Back to list</span>
								</Button>
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<ReportVpnTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Page.layout = Admin;

export default Page;
