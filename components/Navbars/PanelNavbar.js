import * as React from "react";
import Link from "next/link";
// reactstrap components
import {
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Navbar,
	Nav,
	Container,
	Media,
} from "reactstrap";
import Image from "next/future/image";
import user from "/assets/img/theme/user.png";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/features/loginSlice";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";

export default function PanelNavbar({ brandText }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [username, setUsername] = React.useState("");

	React.useEffect(() => {
		setUsername(getLocalStorageItem("username"));
	}, []);

	const logout = () => {
		dispatch(loginActions.logout());
		router.push("/auth/login");
	};

	return (
		<>
			<Navbar
				style={{ zIndex: 10 }}
				className="navbar-top navbar-dark"
				expand="md"
				id="navbar-main"
			>
				<Container fluid>
					<div>
						<a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
							{brandText}
						</a>
					</div>
					<Nav className="align-items-center d-none d-md-flex" navbar>
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
				</Container>
			</Navbar>
		</>
	);
}
