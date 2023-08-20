import * as React from "react";
import Link from "next/link";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import Image from "next/future/image";
import logo from "/assets/img/brand/nextjs_aragon_white.png";
import logoBlack from "/assets/img/brand/nextjs_aragon_black.png";

function AdminNavbar() {
  return (
		<>
			<Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
				<Container className="px-4">
					<Link href="/panel">
						<span className="font-zero">
							<NavbarBrand href="#pablo">
								<Image alt="..." src={logo} />
							</NavbarBrand>
						</span>
					</Link>
					<button className="navbar-toggler" id="navbar-collapse-main">
						<span className="navbar-toggler-icon" />
					</button>
					<UncontrolledCollapse navbar toggler="#navbar-collapse-main">
						<div className="navbar-collapse-header d-md-none">
							<Row>
								<Col className="collapse-brand" xs="6">
									<Link href="/panel">
										<Image alt="..." src={logoBlack} />
									</Link>
								</Col>
								<Col className="collapse-close" xs="6">
									<button className="navbar-toggler" id="navbar-collapse-main">
										<span />
										<span />
									</button>
								</Col>
							</Row>
						</div>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<Link href="/panel">
									<NavLink href="#pablo" className="nav-link-icon">
										<i className="ni ni-planet" />
										<span className="nav-link-inner--text">Dashboard</span>
									</NavLink>
								</Link>
							</NavItem>
							<NavItem>
								<Link href="/auth/register">
									<NavLink href="#pablo" className="nav-link-icon">
										<i className="ni ni-circle-08" />
										<span className="nav-link-inner--text">Register</span>
									</NavLink>
								</Link>
							</NavItem>
							<NavItem>
								<Link href="/auth/login">
									<NavLink href="#pablo" className="nav-link-icon">
										<i className="ni ni-key-25" />
										<span className="nav-link-inner--text">Login</span>
									</NavLink>
								</Link>
							</NavItem>
							<NavItem>
								<Link href="/auth/forgetPassword">
									<NavLink href="#pablo" className="nav-link-icon">
										<i className="ni ni-lock-circle-open" />
										<span className="nav-link-inner--text">
											Forget Password
										</span>
									</NavLink>
								</Link>
							</NavItem>
						</Nav>
					</UncontrolledCollapse>
				</Container>
			</Navbar>
		</>
	);
}

export default AdminNavbar;
