import {Card, CardHeader, Container, Row} from "reactstrap";
import Header from "/components/Headers/Header.js";
import Admin from "../../layouts/Admin";
import AdminChargeTable from "../../components/Panel/Charge/AdminChargeTable";

function ChargeAdmin() {
    return (<>
        <Header/>
        <Container className="mt--9" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 flex items-center gap-4">
                            <h3 className="mb-0">Charge reports</h3>
                        </CardHeader>
                        <AdminChargeTable/>
                    </Card>
                </div>
            </Row>
        </Container>
    </>);
}

ChargeAdmin.layout = Admin;

export default ChargeAdmin;
