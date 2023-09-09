import * as React from "react";
import {useRouter} from "next/router";

// reactstrap components
import {Col, Container, Row} from "reactstrap";

// core components
import ShopNavbar from "../components/Navbars/ShopNavbar";
import AuthFooter from "/components/Footers/AuthFooter.js";

function Auth(props) {
    const router = useRouter();

    React.useEffect(() => {
        document.querySelector(":root").classList.add("not-landing");

        document.body.classList.add("bg-default");
        // Specify how to clean up after this effect:
        return function cleanup() {
            document.body.classList.remove("bg-default");
        };
    }, []);

    return (
			<div className="not-landing">
				<div className="main-content">
					<ShopNavbar />
					<div className="header bg-gradient-success py-7 py-lg-8">
						<Container>
							<div className="header-body text-center mb-7">
								<Row className="justify-content-center">
									<Col lg="5" md="6">
										<h1 className="text-white">Buy a vpn package</h1>
										<div className="text-slate-200">
											Buy vpn packages directly from here or you can charge your
											account and purchase from your panel.
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
