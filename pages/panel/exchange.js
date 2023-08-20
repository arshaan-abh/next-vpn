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
import User from "/layouts/User.js";
import Header from "/components/Headers/Header.js"
import {useRouter} from "next/router"

function Exchange() {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false)
    const coins = ["BNB", "BTC", "ZED", "USDT"]
    const [FromCryptoStatus, setFromCryptoStatus] = useState(coins[0])
    const [ToCryptoStatus, setToCryptoStatus] = useState(coins[1])

    return (<>
        <Header/>
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 flex items-center gap-4">
                            <h3 className="mb-0">Exchange</h3>
                            <Button color="primary" size="sm" onClick={() => setModalOpen(!modalOpen)}>
                                <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                                <span className="btn-inner--text">Crypto</span>
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
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                                <td className="text-right">
                                    <Button
                                        size="sm"
                                        outline
                                        color="info"
                                        type="button"
                                        onClick={() => {
                                            router.push("/panel/exchangeVersion")
                                        }}>
                                        Version
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                                <td className="text-right">
                                    <Button
                                        size="sm"
                                        outline
                                        color="info"
                                        type="button"
                                        onClick={() => {
                                            router.push("/panel/exchangeVersion")
                                        }}>
                                        Version
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                                <td className="text-right">
                                    <Button
                                        size="sm"
                                        outline
                                        color="info"
                                        type="button"
                                        onClick={() => {
                                            router.push("/panel/exchangeVersion")
                                        }}>
                                        Version
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                                <td className="text-right">
                                    <Button
                                        size="sm"
                                        outline
                                        color="info"
                                        type="button"
                                        onClick={() => {
                                            router.push("/panel/exchangeVersion")
                                        }}>
                                        Version
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                                <td className="text-right">
                                    <Button
                                        size="sm"
                                        outline
                                        color="info"
                                        type="button"
                                        onClick={() => {
                                            router.push("/panel/exchangeVersion")
                                        }}>
                                        Version
                                    </Button>
                                </td>
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
                    <FormGroup className="flex gap-4 items-center">
                        <label className="form-control-label mb-0" htmlFor="from-crypto-status">
                            From crypto
                        </label>
                        <UncontrolledDropdown>
                            <DropdownToggle
                                caret
                                color="secondary"
                                id="from-crypto-status"
                                type="button">
                                {FromCryptoStatus}
                            </DropdownToggle>
                            <DropdownMenu aria-labelledby="arch-status">
                                {coins.map((coin) =>
                                    <DropdownItem href="#pablo" onClick={(e) => {
                                        e.preventDefault()
                                        setFromCryptoStatus(coin)
                                    }}>
                                        {coin}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </FormGroup>
                    <FormGroup className="flex gap-4 items-center mb-0">
                        <label className="form-control-label mb-0" htmlFor="to-crypto-status">
                            To crypto
                        </label>
                        <UncontrolledDropdown>
                            <DropdownToggle
                                caret
                                color="secondary"
                                id="to-crypto-status"
                                type="button">
                                {ToCryptoStatus}
                            </DropdownToggle>
                            <DropdownMenu aria-labelledby="arch-status">
                                {coins.map((coin) =>
                                    <DropdownItem href="#pablo" onClick={(e) => {
                                        e.preventDefault()
                                        setToCryptoStatus(coin)
                                    }}>
                                        {coin}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </UncontrolledDropdown>
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

Exchange.layout = User;

export default Exchange
