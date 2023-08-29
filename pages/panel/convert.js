import { Card, CardHeader, Container, Row } from "reactstrap";
import User from "/layouts/User.js";
import Header from "/components/Headers/Header.js";
import ConvertTable from "../../components/Panel/Convert/ConvertTable";
import ConvertAdd from "../../components/Panel/Convert/ConvertAdd";

function Convert() {
	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Convert</h3>
								<ConvertAdd />
							</CardHeader>
							<ConvertTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Convert.layout = User;

export default Convert;
