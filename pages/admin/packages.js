import React from "react";

// reactstrap components
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
  UncontrolledTooltip,
} from "reactstrap";
// layout for this page
import Admin from "/layouts/Admin.js";
// core components
import Header from "/components/Headers/Header.js";
import Image from "next/future/image";
import bootstrap from "/assets/img/theme/bootstrap.jpg";
import team from "/assets/img/theme/team-1-800x800.jpg";
import teamTwo from "/assets/img/theme/team-2-800x800.jpg";
import teamThree from "/assets/img/theme/team-3-800x800.jpg";
import teamFour from "/assets/img/theme/team-4-800x800.jpg";
import angular from "/assets/img/theme/angular.jpg";
import sketch from "/assets/img/theme/sketch.jpg";
import react from "/assets/img/theme/react.jpg";
import vue from "/assets/img/theme/vue.jpg";
import {router} from "next/client";

function Packages() {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Packages</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Package name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Duration</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
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
                        <i className="bg-warning" />
                        pending
                      </Badge>
                    </td>
                    <td>10 days</td>
                    <td className="text-right">
                      <Button outline color="info" type="button" onClick={() => router.push("/admin/packages/detail")}>
                        <span className="btn-inner--icon"><i className="ni ni-settings"></i></span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
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
                        <i className="bg-success" />
                        completed
                      </Badge>
                    </td>
                    <td>10 days</td>
                    <td className="text-right">
                      <Button outline color="info" type="button" onClick={() => router.push("/admin/packages/detail")}>
                        <span className="btn-inner--icon"><i className="ni ni-settings"></i></span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
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
                        <i className="bg-danger" />
                        delayed
                      </Badge>
                    </td>
                    <td>10 days</td>
                    <td className="text-right">
                      <Button outline color="info" type="button" onClick={() => router.push("/admin/packages/detail")}>
                        <span className="btn-inner--icon"><i className="ni ni-settings"></i></span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
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
                        <i className="bg-info" />
                        on schedule
                      </Badge>
                    </td>
                    <td>10 days</td>
                    <td className="text-right">
                      <Button outline color="info" type="button" onClick={() => router.push("/admin/packages/detail")}>
                        <span className="btn-inner--icon"><i className="ni ni-settings"></i></span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
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
                        <i className="bg-success" />
                        completed
                      </Badge>
                    </td>
                    <td>10 days</td>
                    <td className="text-right">
                      <Button outline color="info" type="button" onClick={() => router.push("/admin/packages/detail")}>
                        <span className="btn-inner--icon"><i className="ni ni-settings"></i></span>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <div className="flex gap-4 items-center">
                    <div className="grow">
                      <Button block color="primary">
                        <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                        <span className="btn-inner--text">Add Package</span>
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
    </>
  );
}

Packages.layout = Admin;

export default Packages;
