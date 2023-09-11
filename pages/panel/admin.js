import Header from "../../components/Headers/Header";
import AdminLayout from "/layouts/Admin";
import {Container, Row} from "reactstrap";
import * as React from "react";
import StatusCard from "../../components/Panel/Admin/StatusCard";

function Admin() {
    return <>
        <Header/>
        <Container className="mt--9" fluid>
            <Row>
                <div className="col">
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatusCard
                            number="10"
                            text="Users"
                            iconClass="ni ni-circle-08"
                            backColorClass="bg-blue-400"/>
                        <StatusCard
                            number="78"
                            text="Vpns"
                            iconClass="ni ni-check-bold"
                            backColorClass="bg-purple-400"/>
                        <StatusCard
                            number="3"
                            text="Admins"
                            iconClass="ni ni-chart-bar-32"
                            backColorClass="bg-green-400"/>
                        <StatusCard
                            number="0"
                            text="Arches"
                            iconClass="ni ni-chart-pie-35"
                            backColorClass="bg-yellow-400"/>
                    </div>
                </div>
            </Row>
        </Container>
    </>;
}

Admin.layout = AdminLayout;

export default Admin;