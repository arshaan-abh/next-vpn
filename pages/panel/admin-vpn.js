import React from "react";
import {Card, CardHeader, Container, Row} from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import VpnAdd from "../../components/Panel/Vpn/VpnAdd";
import AdminVpnTable from "../../components/Panel/Vpn/AdminVpnTable";

function Vpn() {
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
                            <AdminVpnTable/>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}

Vpn.layout = Admin;

export default Vpn;
