import * as React from "react";

// reactstrap components
import { Card, CardBody, Col } from "reactstrap";
// layout for this page
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";

function ForgotPasswordRequest() {
	const router = useRouter();

	return (
		<>
			<Col lg="6" md="8">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="font-bold text-lg text-slate-800">
							Recover your password
						</div>
						<div className="font-normal text-base text-slate-700 py-3">
							Reset password link is sent to your email. Follow your password
							reovery steps from there.
						</div>
					</CardBody>
				</Card>
			</Col>
		</>
	);
}

ForgotPasswordRequest.layout = Auth;

export default ForgotPasswordRequest;
