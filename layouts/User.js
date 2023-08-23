import * as React from "react";
import { useRouter } from "next/router";
// core components
import UserNavbar from "/components/Navbars/UserNavbar.js";
import UserSidebar from "/components/Sidebar/UserSidebar.js";
import logo from "/assets/img/brand/nextjs_aragon_black.png";

import routes from "/routes.js";
import { getLocalStorageItem } from "../utils/handleLocalStorage";

function User(props) {
	// used for checking current route
	const router = useRouter();
	let mainContentRef = React.createRef();

	React.useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainContentRef.current.scrollTop = 0;

		const roletoken = getLocalStorageItem("roletoken");
		if (!roletoken) router.push("/auth/login");
	}, []);

	return (
		<div className="not-landing">
			<UserSidebar
				{...props}
				routes={routes}
				logo={{
					innerLink: "/panel",
					imgSrc: logo,
					imgAlt: "...",
				}}
			/>
			<div className="main-content" ref={mainContentRef}>
				<UserNavbar {...props} brandText="User Dashboard" />
				{props.children}
			</div>
		</div>
	);
}

export default User;
