import React from "react";
import { Card, CardHeader, Container, Row } from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import GroupTable from "../../components/Panel/Group/GroupTable";
import GroupAdd from "../../components/Panel/Group/GroupAdd";

function Group() {
	const router = useRouter();

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Groups</h3>
								<GroupAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<GroupTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Group.layout = Admin;

export default Group;
