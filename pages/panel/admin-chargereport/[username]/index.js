import React from "react";
import { Card, CardHeader, Container, Row, Button } from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import ReportChargeTable from "../../../../components/Panel/Charge/ReportChargeTable";
import AdminChargeAdd from "../../../../components/Panel/Charge/AdminChargeAdd";

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
								<h3 className="mb-0">{username}&apos;s charges</h3>
								<Button
									color="danger"
									size="sm"
									onClick={() => router.push("/panel/admin-charge")}
								>
									<span className="btn-inner--icon">
										<i className="ni ni-bold-left"></i>
									</span>
									<span className="btn-inner--text">Back to list</span>
								</Button>
								<AdminChargeAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<ReportChargeTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Page.layout = Admin;

export default Page;
