import * as React from "react";
import Link from "next/link";
// reactstrap components
import {Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row, UncontrolledCollapse,} from "reactstrap";
import Image from "next/future/image";
import logo from "/assets/img/brand/nextjs_aragon_white.png";
import logoBlack from "/assets/img/brand/nextjs_aragon_black.png";

function ShopNavbar() {
    return (
        <>
            <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
                <Container className="px-4">
                    <Link href="/">
						<span className="font-zero">
							<NavbarBrand href="#pablo">
								<Image alt="..." src={logo}/>
							</NavbarBrand>
						</span>
                    </Link>
                    <button className="navbar-toggler" id="navbar-collapse-main">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
                        <div className="navbar-collapse-header d-md-none">
                            <Row>
                                <Col className="collapse-brand" xs="6">
                                    <Link href="/panel">
                                        <Image alt="..." src={logoBlack}/>
                                    </Link>
                                </Col>
                                <Col className="collapse-close" xs="6">
                                    <button className="navbar-toggler" id="navbar-collapse-main">
                                        <span/>
                                        <span/>
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/#pricing" className="nav-link-icon">
                                    <i className="ni ni-shop"/>
                                    <span className="nav-link-inner--text">Home</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>
        </>
    );
}

export default ShopNavbar;
