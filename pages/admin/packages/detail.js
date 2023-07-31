import React, {useState} from "react"
import {
    Badge,
    Button,
    Card,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Media,
    Modal,
    ModalBody,
    ModalFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
} from "reactstrap"
import Admin from "/layouts/Admin.js"
import Header from "/components/Headers/Header.js"
import Image from "next/future/image"
import sketch from "/assets/img/theme/sketch.jpg"
import react from "/assets/img/theme/react.jpg"
import vue from "/assets/img/theme/vue.jpg"

function PackagesDetail() {
    const [modalOpen, setModalOpen] = useState(false);

    return (<>
        <Header/>
        <Container className="mt--7" fluid>
            <Row className="mt-5 mb-4">
                <div className="col">
                    <Card className="bg-default shadow">
                        <CardHeader className="bg-transparent border-0 flex items-center gap-4">
                            <h3 className="text-white mb-0">Packages detail</h3>
                            <Button color="primary" size="sm">
                                <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                                <span className="btn-inner--text">Add Vpn</span>
                            </Button>
                            <Button className="btn-icon ml-lg-auto" color="primary" size="sm">
                                <i className="fas fa-search"></i>
                            </Button>
                        </CardHeader>
                        <Table
                            className="align-items-center table-dark table-flush"
                            responsive>
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Password</th>
                                <th scope="col">Type</th>
                                <th scope="col" className="text-right">Owner</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>$2,500 USD</td>
                                <td>...</td>
                                <td>Default</td>
                                <td className="text-right">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-warning"/>
                                        pending
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>$1,800 USD</td>
                                <td>...</td>
                                <td>Pro</td>
                                <td className="text-right">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-success"/>
                                        completed
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>$3,150 USD</td>
                                <td>...</td>
                                <td>Default</td>
                                <td className="text-right">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-danger"/>
                                        delayed
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>$4,400 USD</td>
                                <td>...</td>
                                <td>Pro</td>
                                <td className="text-right">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-info"/>
                                        on schedule
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>$2,200 USD</td>
                                <td>...</td>
                                <td>Default</td>
                                <td className="text-right">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-success"/>
                                        completed
                                    </Badge>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <CardFooter className="bg-default py-4" style={{borderColor: "#1f3a68"}}>
                            <nav aria-label="...">
                                <div className="flex gap-4 items-center">
                                    <div className="grow"></div>
                                    <Pagination
                                        className="pagination justify-content-end mb-0"
                                        listClassName="justify-content-end mb-0">
                                        <PaginationItem className="disabled">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                tabIndex="-1">
                                                <i className="fas fa-angle-left"/>
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="active">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                2 <span className="sr-only">(current)</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                3
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                <i className="fas fa-angle-right"/>
                                                <span className="sr-only">Next</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                            </nav>
                        </CardFooter>
                    </Card>
                </div>
            </Row>
        </Container>

        <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
            <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                    Modal title
                </h5>
                <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={() => setModalOpen(!modalOpen)}>
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <ModalBody>
                <Form>
                    <h6 className="heading-small text-muted mb-4">
                        Vpn credentials
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-username">
                                        Name
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-username"
                                        placeholder="Name here"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-email">
                                        Username
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="Username here"
                                        type="email"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-first-name">
                                        Password
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-first-name"
                                        placeholder="Password here"
                                        type="password"
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-last-name">
                                        Password again
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        defaultValue="Jesse"
                                        id="input-last-name"
                                        placeholder="Last name"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="secondary"
                    type="button"
                    onClick={() => setModalOpen(!modalOpen)}>
                    Close
                </Button>
                <Button color="primary" type="button">
                    Save changes
                </Button>
            </ModalFooter>
        </Modal>
    </>)
}

PackagesDetail.layout = Admin

export default PackagesDetail
