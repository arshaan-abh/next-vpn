/*eslint-disable*/
import * as React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

function Login() {
	return (
		<>
			<footer className="py-5">
				<Container>
					<Row className="align-items-center justify-content-xl-between">
						<Col xl="6">
							<div className="copyright text-center text-xl-left text-muted">
								© {new Date().getFullYear()} Aragon VPN
							</div>
						</Col>
						<Col xl="6">
							<Nav className="nav-footer justify-content-center justify-content-xl-end">
								<NavItem>
									<NavLink href="/" target="_blank">
										About
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="/" target="_blank">
										Feature
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="/" target="_blank">
										Pricing
									</NavLink>
								</NavItem>
							</Nav>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
}

export default Login;
