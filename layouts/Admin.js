import * as React from "react";
import { useRouter } from "next/router";
// core components
import AdminSidebar from "/components/Sidebar/AdminSidebar.js";
import logo from "/assets/img/brand/nextjs_aragon_black.png";
import PanelNavbar from "../components/Navbars/PanelNavbar";

import routes from "/routes.js";
import { getLocalStorageItem } from "../utils/handleLocalStorage";

function Admin(props) {
	// used for checking current route
	const router = useRouter();
	let mainContentRef = React.createRef();
	React.useEffect(() => {
		document.querySelector(":root").classList.add("not-landing");

		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainContentRef.current.scrollTop = 0;

		const roletoken = getLocalStorageItem("roletoken");
		if (!roletoken) router.push("/auth/login");
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
				<PanelNavbar {...props} brandText="Admin Dashboard" />
				{props.children}
			</div>
		</div>
	);
}

export default Admin;
