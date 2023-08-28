import * as React from "react";

// reactstrap components
import {
	Card,
	CardHeader,
	Container,
	Row,
} from "reactstrap";
// layout for this page
import Admin from "/layouts/Admin.js";
// core components
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import PackageAdd from "../../components/Panel/Package/PackageAdd";
import PackageTable from "../../components/Panel/Package/PackageTable";

function Packages() {
	const router = useRouter();

	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--9" fluid>
				{/* Table */}
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Packages</h3>
								<PackageAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<PackageTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Packages.layout = Admin;

export default Packages;
