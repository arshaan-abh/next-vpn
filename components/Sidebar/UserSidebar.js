/*eslint-disable*/
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Media,
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
import team from "/assets/img/theme/team-1-800x800.jpg";

var ps;

function UserSidebar(props) {
	// used for checking current route
	const router = useRouter();
	const [collapseOpen, setCollapseOpen] = React.useState(false);
	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName) => {
		return router.route.indexOf(routeName) > -1;
	};
	// toggles collapse between opened and closed (true/false)
	const toggleCollapse = () => {
		setCollapseOpen(!collapseOpen);
	};
	// closes the collapse
	const closeCollapse = () => {
		setCollapseOpen(false);
	};
	// creates the links that appear in the left menu / Sidebar
	const createLinks = (routes) => {
		return routes.map((prop, key) => {
			if (prop.panel === "panel")
				return (
					<NavItem key={key} active={activeRoute(prop.layout + prop.path)}>
						<Link href={prop.layout + prop.path}>
							<NavLink
								href="#pablo"
								active={activeRoute(prop.layout + prop.path)}
								onClick={closeCollapse}
							>
								<i className={prop.icon} />
								{prop.name}
							</NavLink>
						</Link>
					</NavItem>
				);
		});
	};
	const { routes, logo } = props;
	let navbarBrand = (
		<NavbarBrand href="#pablo" className="pt-0 ml--1">
			{/* todo update project */}
			{/* todo solve this warning */}
			<Image
				alt={logo.imgAlt}
				className="navbar-brand-img"
				src={logo.imgSrc}
				style={{ margin: "auto" }}
			/>
		</NavbarBrand>
	);
	return (
		<Navbar
			className="navbar-vertical fixed-left navbar-light bg-white"
			expand="md"
			id="sidenav-main"
		>
			<Container fluid>
				{/* Toggler */}
				<button
					className="navbar-toggler"
					type="button"
					onClick={toggleCollapse}
				>
					<span className="navbar-toggler-icon" />
				</button>
				{/* Brand */}
				{logo && logo.innerLink ? (
					<Link href={logo.innerLink}>
						<span className="font-zero">{navbarBrand}</span>
					</Link>
				) : null}
				{logo && logo.outterLink ? (
					<a href={logo.innerLink} target="_blank" className="font-zero">
						{navbarBrand}
					</a>
				) : null}
				{/* User */}
				<Nav className="align-items-center d-md-none">
					<UncontrolledDropdown nav>
						<DropdownToggle nav className="nav-link-icon">
							<i className="ni ni-bell-55" />
						</DropdownToggle>
						<DropdownMenu
							aria-labelledby="navbar-default_dropdown_1"
							className="dropdown-menu-arrow"
							right
						>
							<DropdownItem>Action</DropdownItem>
							<DropdownItem>Another action</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>Something else here</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
					<UncontrolledDropdown nav>
						<DropdownToggle nav>
							<Media className="align-items-center">
								<span className="avatar avatar-sm rounded-circle">
									<Image alt="..." src={team} />
								</span>
							</Media>
						</DropdownToggle>
						<DropdownMenu className="dropdown-menu-arrow" right>
							<DropdownItem className="noti-title" header tag="div">
								<h6 className="text-overflow m-0">Welcome!</h6>
							</DropdownItem>
							<Link href="/admin/profile">
								<DropdownItem>
									<i className="ni ni-single-02" />
									<span>My profile</span>
								</DropdownItem>
							</Link>
							<Link href="/admin/profile">
								<DropdownItem>
									<i className="ni ni-settings-gear-65" />
									<span>Settings</span>
								</DropdownItem>
							</Link>
							<Link href="/admin/profile">
								<DropdownItem>
									<i className="ni ni-calendar-grid-58" />
									<span>Activity</span>
								</DropdownItem>
							</Link>
							<Link href="/admin/profile">
								<DropdownItem>
									<i className="ni ni-support-16" />
									<span>Support</span>
								</DropdownItem>
							</Link>
							<DropdownItem divider />
							<DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
								<i className="ni ni-user-run" />
								<span>Logout</span>
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>
				{/* Collapse */}
				<Collapse navbar isOpen={collapseOpen}>
					{/* Collapse header */}
					<div className="navbar-collapse-header d-md-none">
						<Row>
							{logo ? (
								<Col className="collapse-brand" xs="6">
									{logo.innerLink ? (
										<Link href={logo.innerLink}>
											<Image alt={logo.imgAlt} src={logo.imgSrc} />
										</Link>
									) : (
										<a href={logo.outterLink}>
											<Image alt={logo.imgAlt} src={logo.imgSrc} />
										</a>
									)}
								</Col>
							) : null}
							<Col className="collapse-close" xs="6">
								<button
									className="navbar-toggler"
									type="button"
									onClick={toggleCollapse}
								>
									<span />
									<span />
								</button>
							</Col>
						</Row>
					</div>
					{/* Form */}
					<Form className="mt-4 mb-3 d-md-none">
						<InputGroup className="input-group-rounded input-group-merge">
							<Input
								aria-label="Search"
								className="form-control-rounded form-control-prepended"
								placeholder="Search"
								type="search"
							/>
							<InputGroupAddon addonType="prepend">
								<InputGroupText>
									<span className="fa fa-search" />
								</InputGroupText>
							</InputGroupAddon>
						</InputGroup>
					</Form>
					{/* Navigation */}
					<Nav navbar>{createLinks(routes)}</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
}

UserSidebar.defaultProps = {
	routes: [{}],
};

UserSidebar.propTypes = {
	// links that will be displayed inside the component
	routes: PropTypes.arrayOf(PropTypes.object),
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link href="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the image src of the logo
		imgSrc: PropTypes.string.isRequired,
		// the alt for the img
		imgAlt: PropTypes.string.isRequired,
	}),
};

export default UserSidebar;
