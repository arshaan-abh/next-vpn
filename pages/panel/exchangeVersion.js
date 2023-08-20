import React, {useState} from "react"
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Container,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
} from "reactstrap"
import User from "/layouts/User.js";
import Header from "/components/Headers/Header.js"

function ExchangeVersion() {
    const [modalOpen, setModalOpen] = useState(false)

    return (<>
        <Header/>
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 flex items-center gap-4">
                            <h3 className="mb-0">Exchange Version</h3>
                            <Button color="primary" size="sm" onClick={() => setModalOpen(!modalOpen)}>
                                <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                                <span className="btn-inner--text">Add Exchange Version</span>
                            </Button>
                            <Button className="btn-icon ml-lg-auto" color="primary" size="sm">
                                <i className="fas fa-search"></i>
                            </Button>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">From Crypto</th>
                                <th scope="col">To Crypto</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                            </tr>
                            <tr>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                            </tr>
                            <tr>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                            </tr>
                            <tr>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                            </tr>
                            <tr>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                            </tr>
                            </tbody>
                        </Table>
                        <CardFooter className="py-4">
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
        <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} centered>
            <div className="modal-header">
                <h3>
                    Add exchange version
                </h3>
                <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={() => setModalOpen(!modalOpen)}>
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <label className="form-control-label" htmlFor="exchange-version-to">
                            To Crypto
                        </label>
                        <Input
                            placeholder="To"
                            id="exchange-version-to"
                            type="text">
                        </Input>
                    </FormGroup>
                    <FormGroup className="mb-0">
                        <label className="form-control-label" htmlFor="exchange-version-from">
                            From Crypto
                        </label>
                        <Input
                            placeholder="From"
                            id="exchange-version"
                            type="text">
                        </Input>
                    </FormGroup>
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
                    Add
                </Button>
            </ModalFooter>
        </Modal>
    </>)
}

ExchangeVersion.layout = User;

export default ExchangeVersion
