import React from "react";
import {Card, CardHeader, Container, Row} from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import VpnAdd from "../../components/Panel/Vpn/VpnAdd";
import AdminUserVpnTable from "../../components/Panel/Vpn/AdminUserVpnTable";

function UserVpn() {
    return (
        <>
            <Header/>
            <Container className="mt--9" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 flex items-center gap-4">
                                <h3 className="mb-0">User vpn reports</h3>
                                <VpnAdd/>
                            </CardHeader>
                            <AdminUserVpnTable/>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}

UserVpn.layout = Admin;

export default UserVpn;
