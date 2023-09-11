import * as React from "react";

// reactstrap components
import { Card, CardBody, Col } from "reactstrap";
// layout for this page
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageItem } from "../../../../utils/handleLocalStorage";
import LoadingModal from "../../../../components/Dynamic/LoadingModal";
import { emailVerify } from "../../../../store/features/registerSlice";

function Page() {
	const router = useRouter();

	const { token } = router.query;

	const dispatch = useDispatch();

	const loading = useSelector((state) => state.register.loading);
	const error = useSelector((state) => state.register.error);
	const snackMessage = useSelector((state) => state.register.snackMessage);

	React.useEffect(() => {
		const email = getLocalStorageItem("verifyemail");
		if (!email) {
			router.push("/auth/register");
		} else if (
			email &&
			snackMessage !==
				"Your email is successfully verified. You can now close this page and continue to login."
		) {
			dispatch(emailVerify({ token })).unwrap();
		}
	}, []);

	return (
		<>
			<Col lg="6" md="8">
				<Card className="bg-secondary shadow border-0">
					{loading ? (
						<LoadingModal />
					) : (
						<CardBody className="px-lg-5 py-lg-5 relative">
							<div className="font-bold text-lg text-slate-800">
								{error ? "Oops! Something went wrong" : "Account verified"}
							</div>
							<div className="font-normal text-base text-slate-700 py-3">
								{snackMessage}
							</div>
						</CardBody>
					)}
				</Card>
			</Col>
		</>
	);
}

Page.layout = Auth;

export default Page;
