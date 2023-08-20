import * as React from "react";
import { useRouter } from "next/router";
// core components
import AdminNavbar from "/components/Navbars/AdminNavbar.js";
import AdminSidebar from "/components/Sidebar/AdminSidebar.js";
import logo from "/assets/img/brand/nextjs_aragon_black.png";

import routes from "/routes.js";

function Admin(props) {
	// used for checking current route
	const router = useRouter();
	let mainContentRef = React.createRef();
	React.useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainContentRef.current.scrollTop = 0;
	}, []);

	return (
		<div className="not-landing">
			<AdminSidebar
				{...props}
				routes={routes}
				logo={{
					innerLink: "/panel/admin",
					imgSrc: logo,
					imgAlt: "...",
				}}
			/>
			<div className="main-content" ref={mainContentRef}>
				<AdminNavbar {...props} brandText="Admin Dashboard" />
				{props.children}
			</div>
		</div>
	);
}

export default Admin;
