import {Card, CardHeader, Container, Row} from "reactstrap";
import Header from "/components/Headers/Header.js";
import ChargeTable from "../../components/Panel/Charge/ChargeTable";
import Admin from "../../layouts/Admin";

function ChargeAdmin() {
    return (<>
        <Header/>
        <Container className="mt--9" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 flex items-center gap-4">
                            <h3 className="mb-0">Charge Admin</h3>
                        </CardHeader>
                        <ChargeTable/>
                    </Card>
                </div>
            </Row>
        </Container>
    </>);
}

ChargeAdmin.layout = Admin;

export default ChargeAdmin;
