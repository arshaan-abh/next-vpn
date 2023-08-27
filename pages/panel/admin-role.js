import React from "react";
import { Card, CardHeader, Container, Row } from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import RoleTable from "../../components/Panel/Role/RoleTable";
import RoleAdd from "../../components/Panel/Role/RoleAdd";

function Role() {
	const router = useRouter();

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Roles</h3>
								<RoleAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<RoleTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Role.layout = Admin;

export default Role;
