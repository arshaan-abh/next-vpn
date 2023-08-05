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
    Media,
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
import Image from "next/future/image"
import bootstrap from "/assets/img/theme/bootstrap.jpg"
import angular from "/assets/img/theme/angular.jpg"
import sketch from "/assets/img/theme/sketch.jpg"
import react from "/assets/img/theme/react.jpg"
import vue from "/assets/img/theme/vue.jpg"
import {useRouter} from "next/router"
import {useQRCode} from "next-qrcode"

function ChargeAdmin() {
    return (<>
        <Header/>
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 flex items-center gap-4">
                            <h3 className="mb-0">Charge Admin</h3>
                            <Button className="btn-icon ml-lg-auto" color="primary" size="sm">
                                <i className="fas fa-search"></i>
                            </Button>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Symbol</th>
                                <th scope="col">TXid</th>
                                <th scope="col">Creation date</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">
                                    <Media className="align-items-center">
                                        <a
                                            className="avatar rounded-circle mr-3"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}>
                                            <Image
                                                alt="..."
                                                src={bootstrap}
                                            />
                                        </a>
                                        <Media>
                                        <span className="mb-0 text-sm">
                                            Argon Design System
                                        </span>
                                        </Media>
                                    </Media>
                                </th>
                                <td>...</td>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                                <td className="text-right">
                                    <Button
                                        size="sm"
                                        outline
                                        color="info"
                                        type="button"
                                        onClick={() => {
                                        }}>
                                        Detail
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <Media className="align-items-center">
                                        <a
                                            className="avatar rounded-circle mr-3"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}>
                                            <Image
                                                alt="..."
                                                src={angular}
                                            />
                                        </a>
                                        <Media>
                                        <span className="mb-0 text-sm">
                                            Argon Design System
                                        </span>
                                        </Media>
                                    </Media>
                                </th>
                                <td>...</td>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                                <td className="text-right">
                                    <Button
                                        size="sm"
                                        outline
                                        color="info"
                                        type="button"
                                        onClick={() => {
                                        }}>
                                        Detail
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <Media className="align-items-center">
                                        <a
                                            className="avatar rounded-circle mr-3"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}>
                                            <Image
                                                alt="..."
                                                src={sketch}
                                            />
                                        </a>
                                        <Media>
                                            <span className="mb-0 text-sm">Black Dashboard</span>
                                        </Media>
                                    </Media>
                                </th>
                                <td>...</td>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                                <td className="text-right">
                                    <Button
                                        size="sm"
                                        outline
                                        color="info"
                                        type="button"
                                        onClick={() => {
                                        }}>
                                        Detail
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <Media className="align-items-center">
                                        <a
                                            className="avatar rounded-circle mr-3"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}>
                                            <Image
                                                alt="..."
                                                src={react}
                                            />
                                        </a>
                                        <Media>
                                        <span className="mb-0 text-sm">
                                            Argon Design System
                                        </span>
                                        </Media>
                                    </Media>
                                </th>
                                <td>...</td>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                                <td className="text-right">
                                    <Button
                                        size="sm"
                                        outline
                                        color="info"
                                        type="button"
                                        onClick={() => {
                                        }}>
                                        Detail
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <Media className="align-items-center">
                                        <a
                                            className="avatar rounded-circle mr-3"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}>
                                            <Image
                                                alt="..."
                                                src={vue}
                                            />
                                        </a>
                                        <Media>
                                        <span className="mb-0 text-sm">
                                            Argon Design System
                                        </span>
                                        </Media>
                                    </Media>
                                </th>
                                <td>...</td>
                                <td>TXid</td>
                                <td>1402/05/05</td>
                                <td className="text-right">
                                    <Button
                                        size="sm"
                                        outline
                                        color="info"
                                        type="button"
                                        onClick={() => {
                                        }}>
                                        Detail
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
    </>)
}

ChargeAdmin.layout = Admin

export default ChargeAdmin
