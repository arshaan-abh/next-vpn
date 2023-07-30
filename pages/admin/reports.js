import React from "react"
import {
    Badge,
    Button,
    Card,
    CardFooter,
    CardHeader,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
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

function Reports() {
    return (<>
        <Header/>
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Purchased Packages</h3>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Package name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Status</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Completion</th>
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
                                <td>$2,500 USD</td>
                                <td>
                                    <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-warning"/>
                                        pending
                                    </Badge>
                                </td>
                                <td>10 days</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">60%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="60"
                                                barClassName="bg-warning"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-right">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            href="#pablo"
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={(e) => e.preventDefault()}>
                                            <i className="fas fa-ellipsis-v"/>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Action
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Another action
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Something else here
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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
                            Angular Now UI Kit PRO
                          </span>
                                        </Media>
                                    </Media>
                                </th>
                                <td>$1,800 USD</td>
                                <td>
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-success"/>
                                        completed
                                    </Badge>
                                </td>
                                <td>10 days</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">100%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="100"
                                                barClassName="bg-success"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-right">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            href="#pablo"
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={(e) => e.preventDefault()}>
                                            <i className="fas fa-ellipsis-v"/>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Action
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Another action
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Something else here
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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
                                <td>$3,150 USD</td>
                                <td>
                                    <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-danger"/>
                                        delayed
                                    </Badge>
                                </td>
                                <td>10 days</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">72%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="72"
                                                barClassName="bg-danger"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-right">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            href="#pablo"
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={(e) => e.preventDefault()}>
                                            <i className="fas fa-ellipsis-v"/>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Action
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Another action
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Something else here
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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
                            React Material Dashboard
                          </span>
                                        </Media>
                                    </Media>
                                </th>
                                <td>$4,400 USD</td>
                                <td>
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-info"/>
                                        on schedule
                                    </Badge>
                                </td>
                                <td>10 days</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">90%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="90"
                                                barClassName="bg-info"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-right">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            href="#pablo"
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={(e) => e.preventDefault()}>
                                            <i className="fas fa-ellipsis-v"/>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Action
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Another action
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Something else here
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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
                            Vue Paper UI Kit PRO
                          </span>
                                        </Media>
                                    </Media>
                                </th>
                                <td>$2,200 USD</td>
                                <td>
                                    <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-success"/>
                                        completed
                                    </Badge>
                                </td>
                                <td>10 days</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">100%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="100"
                                                barClassName="bg-danger"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-right">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            href="#pablo"
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={(e) => e.preventDefault()}>
                                            <i className="fas fa-ellipsis-v"/>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Action
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Another action
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                Something else here
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <CardFooter className="py-4">
                            <nav aria-label="...">
                                <div className="flex gap-4 items-center">
                                    <div className="grow">
                                        <Button block color="primary">
                                            <span className="btn-inner--icon"><i className="ni ni-basket"></i></span>
                                            <span className="btn-inner--text">Buy a New Package</span>
                                        </Button>
                                    </div>
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

Reports.layout = Admin

export default Reports
