import React from "react"
import {Badge, Card, CardBody, CardHeader, Col, Container, Input, ListGroup, ListGroupItem, Row} from "reactstrap"
import Admin from "/layouts/Admin.js"
import Header from "/components/Headers/Header.js"
import team from "/assets/img/theme/team-4-800x800.jpg"
import Image from "next/future/image"

const Support = () => {
    return (<>
        <Header/>
        <Container className="mt--7" fluid>
            <Row>
                <Col className="mb-5 mb-xl-0" xl="8">
                    <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h6 className="text-uppercase text-light ls-1 mb-1">
                                        Support
                                    </h6>
                                    <h2 className="mb-0">The problem with the thing</h2>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody className="flex flex-col">
                            {/* todo fix layout */}
                            <div className="mr-auto rounded-r-full rounded-t-full bg-primary px-3 py-2 text-white mb-2">
                                Hey, how can I help you with?
                            </div>
                            <div className="ml-auto rounded-l-full rounded-t-full bg-light px-3 py-2 text-black mb-2">
                                I'm having a problem with this dashboards beauty
                            </div>
                            <div className="ml-auto rounded-l-full rounded-t-full bg-light px-3 py-2 text-black mb-2">
                                Its too pretty
                            </div>
                            <div className="mr-auto rounded-r-full rounded-t-full bg-primary px-3 py-2 text-white mb-2">
                                Yeah everyone has that, no can help ):
                            </div>
                            <div className="ml-auto rounded-l-full rounded-t-full bg-light px-3 py-2 text-black mb-2">
                                Thanks for your time anyway
                            </div>
                            <Input className="mt-2 form-control-muted" placeholder="Ask here" type="text"/>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="4">
                    <Card className="shadow overflow-hidden">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h6 className="text-uppercase text-light ls-1 mb-1">
                                        Support
                                    </h6>
                                    <h2 className="mb-0">Tickets</h2>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody className="p-0">
                            {/* todo flex issue */}
                            <ListGroup flush>
                                <ListGroupItem
                                    className="list-group-item-action"
                                    href="javascript:"
                                    tag="a">
                                    <Row className="align-items-center">
                                        <Col className="col-auto">
                                            <Image
                                                alt="..."
                                                className="avatar rounded-circle"
                                                src={team}
                                            />
                                        </Col>
                                        <div className="col ml--2">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h4 className="mb-0 text-sm">John Snow</h4>
                                                </div>
                                                <div className="text-right text-muted">
                                                    <small>2 hrs ago</small>
                                                </div>
                                            </div>
                                            <p className="text-sm mb-0">
                                                <Badge color="" className="badge-dot">
                                                    <i className="bg-warning"/>
                                                    Let's meet at Starbucks at 11:30. Wdyt?
                                                </Badge>
                                            </p>
                                        </div>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem
                                    className="list-group-item-action"
                                    href="javascript:"
                                    tag="a">
                                    <Row className="align-items-center">
                                        <Col className="col-auto">
                                            <Image
                                                alt="..."
                                                className="avatar rounded-circle"
                                                src={team}
                                            />
                                        </Col>
                                        <div className="col ml--2">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h4 className="mb-0 text-sm">John Snow</h4>
                                                </div>
                                                <div className="text-right text-muted">
                                                    <small>3 hrs ago</small>
                                                </div>
                                            </div>
                                            <p className="text-sm mb-0">
                                                <Badge color="" className="badge-dot">
                                                    <i className="bg-success"/>
                                                    A new issue reported.
                                                </Badge>
                                            </p>
                                        </div>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem
                                    className="list-group-item-action"
                                    href="javascript:"
                                    tag="a">
                                    <Row className="align-items-center">
                                        <Col className="col-auto">
                                            <Image
                                                alt="..."
                                                className="avatar rounded-circle"
                                                src={team}
                                            />
                                        </Col>
                                        <div className="col ml--2">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h4 className="mb-0 text-sm">John Snow</h4>
                                                </div>
                                                <div className="text-right text-muted">
                                                    <small>5 hrs ago</small>
                                                </div>
                                            </div>
                                            <p className="text-sm mb-0">
                                                <Badge color="" className="badge-dot">
                                                    <i className="bg-success"/>
                                                    Your posts have been liked a lot.
                                                </Badge>
                                            </p>
                                        </div>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>)
}

Support.layout = Admin

export default Support
