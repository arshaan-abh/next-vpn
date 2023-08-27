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
import ArchAdd from "../../components/Panel/Arch/ArchAdd";
import ArchTable from "../../components/Panel/Arch/ArchTable";

function Arches() {
	const router = useRouter();

	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Arches</h3>
								<ArchAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<ArchTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Arches.layout = Admin;

export default Arches;
