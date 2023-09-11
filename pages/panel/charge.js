import { Card, CardHeader, Container, Row } from "reactstrap";
import User from "/layouts/User.js";
import Header from "/components/Headers/Header.js";
import UserChargeAdd from "../../components/Panel/Charge/UserChargeAdd";
import UserChargeTable from "../../components/Panel/Charge/UserChargeTable";

function Charge() {
	return (
		<>
			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Charge</h3>
								<UserChargeAdd />
							</CardHeader>
							<UserChargeTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Charge.layout = User;

export default Charge;
