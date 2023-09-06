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
import GroupVersionAdd from "../../../../components/Panel/Group/GroupVersionAdd";
import GroupVersionTable from "../../../../components/Panel/Group/GroupVersionTable";

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
								<h3 className="mb-0">Group versions</h3>
								<GroupVersionAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<GroupVersionTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Page.layout = Admin;

export default Page;
