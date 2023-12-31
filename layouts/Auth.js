import * as React from "react";
import { useRouter } from "next/router";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "/components/Navbars/AuthNavbar.js";
import AuthFooter from "/components/Footers/AuthFooter.js";
import { getLocalStorageItem } from "../utils/handleLocalStorage";

function Auth(props) {
	const router = useRouter();

	React.useEffect(() => {
		// todo remove the initial lag in firefox:
		document.querySelector(":root").classList.add("not-landing");

		const roletoken = getLocalStorageItem("roletoken");
		if (roletoken) router.push("/panel");

		document.body.classList.add("bg-default");
		// Specify how to clean up after this effect:
		return function cleanup() {
			document.body.classList.remove("bg-default");
		};
	}, []);

	return (
		<div className="not-landing">
			<div className="main-content">
				<AuthNavbar />
				<div className="header bg-gradient-info py-7 py-lg-8">
					<Container>
						<div className="header-body text-center mb-7">
							<Row className="justify-content-center">
								<Col lg="5" md="6">
									<h1 className="text-white">Welcome!</h1>
									<div className="text-slate-200">
										Use your AragonVPN panel to get the most out of our product!
									</div>
								</Col>
							</Row>
						</div>
					</Container>
					<div className="separator separator-bottom separator-skew zindex-100">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="none"
							version="1.1"
							viewBox="0 0 2560 100"
							x="0"
							y="0"
						>
							<polygon
								className="fill-default"
								points="2560 0 2560 100 0 100"
							/>
						</svg>
					</div>
				</div>
				{/* Page content */}
				<Container className="mt--8 pb-5">
					<Row className="justify-content-center">{props.children}</Row>
				</Container>
			</div>
			<AuthFooter />
		</div>
	);
}

export default Auth;
