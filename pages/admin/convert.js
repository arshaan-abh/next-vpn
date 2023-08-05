import React, {useState} from "react"
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
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
    UncontrolledDropdown,
} from "reactstrap"
import Admin from "/layouts/Admin.js"
import Header from "/components/Headers/Header.js"

function Convert() {
    const [modalOpen, setModalOpen] = useState(false)
    const coins = ["BNB", "BTC", "ZED", "USDT"]
    const [btcUsdtStatus, setBtcUsdtStatus] = useState(coins[0])

    return (<>
        <Header/>
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 flex items-center gap-4">
                            <h3 className="mb-0">Convert</h3>
                            <Button color="primary" size="sm" onClick={() => setModalOpen(!modalOpen)}>
                                <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                                <span className="btn-inner--text">Convert</span>
                            </Button>
                            <Button className="btn-icon ml-lg-auto" color="primary" size="sm">
                                <i className="fas fa-search"></i>
                            </Button>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">From crypto</th>
                                <th scope="col">To crypto</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Creation date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>BNB</td>
                                <td>BTC</td>
                                <td>24,673,000</td>
                                <td>1402/05/05</td>
                            </tr>
                            <tr>
                                <td>BNB</td>
                                <td>BTC</td>
                                <td>24,673,000</td>
                                <td>1402/05/05</td>
                            </tr>
                            <tr>
                                <td>BNB</td>
                                <td>BTC</td>
                                <td>24,673,000</td>
                                <td>1402/05/05</td>
                            </tr>
                            <tr>
                                <td>BNB</td>
                                <td>BTC</td>
                                <td>24,673,000</td>
                                <td>1402/05/05</td>
                            </tr>
                            <tr>
                                <td>BNB</td>
                                <td>BTC</td>
                                <td>24,673,000</td>
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
                    Convert
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
                    <FormGroup className="flex gap-4 items-center">
                        <label className="form-control-label mb-0" htmlFor="BTC-USDT">
                            BTC/USDT
                        </label>
                        <UncontrolledDropdown>
                            <DropdownToggle
                                caret
                                color="secondary"
                                id="BTC-USDT"
                                type="button">
                                {btcUsdtStatus}
                            </DropdownToggle>
                            <DropdownMenu aria-labelledby="arch-status">
                                {coins.map((coin) =>
                                    <DropdownItem href="#pablo" onClick={(e) => {
                                        e.preventDefault()
                                        setBtcUsdtStatus(coin)
                                    }}>
                                        {coin}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </FormGroup>
                    <FormGroup>
                        <label className="form-control-label" htmlFor="convert-amount">
                            Amount
                        </label>
                        <Input
                            placeholder="Amount here"
                            id="convert-amount"
                            type="text">
                        </Input>
                    </FormGroup>
                    <FormGroup className="flex gap-4 items-center mb-0">
                        buy
                        <label className="custom-toggle mb-0">
                            <input defaultChecked type="checkbox"></input>
                            <span className="custom-toggle-slider rounded-circle"></span>
                        </label>
                        sell
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
                    Convert
                </Button>
            </ModalFooter>
        </Modal>
    </>)
}

Convert.layout = Admin

export default Convert
