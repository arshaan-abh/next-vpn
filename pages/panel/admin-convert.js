import { Card, CardHeader, Container, Row } from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import AdminConvertTable from "../../components/Panel/Convert/AdminConvertTable";

function Convert() {
	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Convert reports</h3>
							</CardHeader>
							<AdminConvertTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Convert.layout = Admin;

export default Convert;
