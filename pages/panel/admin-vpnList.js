import React from "react";
import {Card, CardHeader, Container, Row} from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import VpnAdd from "../../components/Panel/Vpn/VpnAdd";
import VpnTable from "../../components/Panel/Vpn/VpnTable";

function VpnList() {
    return (
        <>
            <Header/>
            <Container className="mt--9" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 flex items-center gap-4">
                                <h3 className="mb-0">Vpns</h3>
                                <VpnAdd/>
                            </CardHeader>
                            <VpnTable/>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}

VpnList.layout = Admin;

export default VpnList;
