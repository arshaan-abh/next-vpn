import * as React from "react";
// reactstrap components
import { Button, Card, CardBody, Col, Row } from "reactstrap";
// layout for this page
import ShopLayout from "/layouts/Shop";
import { useRouter } from "next/router";
import { getLocalStorageItem } from "../../../../utils/handleLocalStorage";

function Page() {
	const router = useRouter();

	const { crediantials } = router.query;

	React.useEffect(() => {
		const roletoken = getLocalStorageItem("roletoken");
		if (!roletoken) router.push("/auth/login");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Col lg="6" md="8">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="font-bold text-lg text-slate-800">
							Purchase confirmed
						</div>
						<div className="font-normal text-base text-slate-700 py-3">
							Username: {crediantials[0]} / Password: {crediantials[1]}
						</div>
						<form>
							<Row className="mx-0 justify-between">
								<Button
									className="!flex flex-row align-items-center h-12"
									color="success"
									onClick={() => router.push("/panel/vpn")}
								>
									Confirm
								</Button>
							</Row>
						</form>
					</CardBody>
				</Card>
			</Col>
		</>
	);
}

Page.layout = ShopLayout;

export default Page;
