import * as React from "react";
// reactstrap components
import { Button, Card, CardBody, Col, Row } from "reactstrap";
// layout for this page
import ShopLayout from "/layouts/Shop";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteInput from "../../../../components/Form/AutoCompleteInput";
import {
	fetchAllPackageCryptoArches,
	fetchPackages,
} from "../../../../store/features/packageSlice";
import {
	getLocalStorageItem,
	setLocalStorageItem,
} from "../../../../utils/handleLocalStorage";
import { loginActions } from "../../../../store/features/loginSlice";

const validationSchema = yup.object().shape({
	packageCryptoArchId: yup.string().required("Package crypto arch is required"),
});

function Page() {
	const router = useRouter();

	const { packageid } = router.query;

	const formik = useFormik({
		initialValues: { packageCryptoArchId: "" },
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const roletoken = getLocalStorageItem("roletoken");
			if (!roletoken) {
				setLocalStorageItem("paymentmethod", values.packageCryptoArchId, 1);
				dispatch(
					loginActions.setError(
						"You have to sign in first in order to buy a package."
					)
				);
				router.push("/auth/login");
			} else {
				router.push(`/shop/transaction/${values.packageCryptoArchId}`);
			}
		},
	});

	const dispatch = useDispatch();

	const data = useSelector((state) => state.package.data);
	const packageCryptoArchData = useSelector(
		(state) => state.package.cryptoData
	);

	const packageFix = data?.find((item) => item.id === packageid);
	const packageCryptoArchDataFix = packageCryptoArchData?.filter(
		(data) => data.package.id === packageid
	);

	React.useEffect(() => {
		dispatch(fetchPackages());
		dispatch(fetchAllPackageCryptoArches());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Col lg="6" md="8">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="font-bold text-lg text-slate-800 mb-4">
							{packageFix?.title} Plan{" "}
							<span className="font-normal">
								- {packageFix?.duration} days / {packageFix?.userCount} users /{" "}
								{packageFix?.trafficAmount}
							</span>
						</div>
						<form onSubmit={formik.handleSubmit}>
							<AutoCompleteInput
								labelShrink
								className="py-2"
								fieldName="packageCryptoArchId"
								labelName="name"
								valueName="id"
								label="Network and crypto"
								placeholder="Select your payment type"
								options={packageCryptoArchDataFix?.map((item, i) => {
									return {
										id: item?.id,
										name: `${item?.cryptoArch?.arch?.name}(${item?.cryptoArch?.arch?.symbol}) - ${item?.cryptoArch?.crypto?.name}(${item?.cryptoArch?.crypto?.symbol})`,
									};
								})}
								formik={formik}
							/>

							<Row className="mt-4 mx-0 justify-between">
								<Button
									className="!flex flex-row align-items-center h-12"
									color="primary"
									type="submit"
									disabled
								>
									Back
								</Button>
								<Button
									className="!flex flex-row align-items-center h-12"
									color="success"
									type="submit"
								>
									Next
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
