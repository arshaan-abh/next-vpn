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
import PackageVpnAdd from "../../../../components/Panel/Package/PackageVpnAdd";
import PackageVpnTable from "../../../../components/Panel/Package/PackageVpnTable";

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
								<h3 className="mb-0">Package vpns</h3>
								<PackageVpnAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<PackageVpnTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Page.layout = Admin;

export default Page;
