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
import user from "/assets/img/theme/user.png";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/features/loginSlice";

var ps;

function UserSidebar(props) {
	const dispatch = useDispatch();
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

	const [username, setUsername] = React.useState("");

	React.useEffect(() => {
		setUsername(getLocalStorageItem("username"));
	}, []);

	const logout = () => {
		dispatch(loginActions.logout());
		router.push("/auth/login");
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
						<DropdownToggle className="pr-0" nav>
							<Media className="align-items-center">
								<span className="avatar avatar-sm rounded-circle">
									<Image alt="..." src={user} />
								</span>
								<Media className="ml-2 d-none d-lg-block">
									<span className="mb-0 text-sm font-weight-bold">
										Welcome! {username}
									</span>
								</Media>
							</Media>
						</DropdownToggle>
						<DropdownMenu className="dropdown-menu-arrow text-white" right>
							{/* <DropdownItem className="noti-title" header tag="div">
									<h6 className="text-overflow m-0">Welcome!</h6>
								</DropdownItem>
								<Link href="/panel/admin" className="opacity-80">
									<DropdownItem>
										<i className="ni ni-single-02" />
										<span>My profile</span>
									</DropdownItem>
								</Link>
								<Link href="/panel/admin">
									<DropdownItem>
										<i className="ni ni-settings-gear-65" />
										<span>Settings</span>
									</DropdownItem>
								</Link>
								<Link href="/panel/admin">
									<DropdownItem>
										<i className="ni ni-calendar-grid-58" />
										<span>Activity</span>
									</DropdownItem>
								</Link>
								<Link href="/panel/admin">
									<DropdownItem>
										<i className="ni ni-support-16" />
										<span>Support</span>
									</DropdownItem>
								</Link>
								<DropdownItem divider /> */}
							<DropdownItem onClick={logout}>
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
