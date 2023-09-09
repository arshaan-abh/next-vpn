import * as React from "react";
// reactstrap components
import { Button, Card, CardBody, Col, Row } from "reactstrap";
// layout for this page
import ShopLayout from "/layouts/Shop";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPackageCryptoArches } from "../../../../store/features/packageSlice";
import TextInput from "../../../../components/Form/TextInput";
import LoadingModal from "../../../../components/Dynamic/LoadingModal";
import {
	chargeActions,
	checkTransaction,
} from "../../../../store/features/chargeSlice";
import SnackAlert from "../../../../components/Dynamic/SnackAlert";
import { getLocalStorageItem } from "../../../../utils/handleLocalStorage";

const validationSchema = yup.object().shape({
	transactionId: yup.string().required("Transaction address is required"),
});

function Page() {
	const router = useRouter();

	const { packagecryptoarchid } = router.query;

	const data = useSelector((state) => state.charge.transactionData);
	const loadingAction = useSelector((state) => state.charge.loadingAction);
	const snackMessage = useSelector((state) => state.charge.snackMessage);
	const error = useSelector((state) => state.charge.error);
	const stage = useSelector((state) => state.charge.stage);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			packageCryptoArchId: packagecryptoarchid,
			transactionId: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(checkTransaction(values));
		},
	});

	const dispatch = useDispatch();

	const packageCryptoArchData = useSelector(
		(state) => state.package.cryptoData
	);
	const packageCryptoArchDataFix = packageCryptoArchData?.find(
		(data) => data.id === packagecryptoarchid
	);

	React.useEffect(() => {
		const roletoken = getLocalStorageItem("roletoken");
		if (!roletoken) router.push("/auth/login");

		dispatch(fetchAllPackageCryptoArches());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(chargeActions.clearSnackMessage());
	};

	const [isCopied, setIsCopied] = React.useState(false);

	const handleCopyToClipboard = () => {
		const textField = document.createElement("textarea");
		textField.innerText = packageCryptoArchDataFix?.cryptoArch?.companyAddress;
		document.body.appendChild(textField);
		textField.select();
		document.execCommand("copy");
		textField.remove();

		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	React.useEffect(() => {
		if (stage === "purchased") {
			setTimeout(() => {
				router.push(`/shop/success/${data.username}/${data.password}`);
				dispatch(chargeActions.clearStage());
			}, 2000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage]);

	return (
		<>
			<SnackAlert
				props={{
					isSnackOpen,
					handleCloseSnack,
					snackMessage,
					error: error,
				}}
			/>

			<Col lg="6" md="8">
				<Card className="relative bg-secondary shadow border-0">
					{loadingAction ? <LoadingModal /> : null}
					<CardBody className="px-lg-5 py-lg-5">
						<div className="font-bold text-base text-slate-800 mb-2">
							Price:{" "}
							<span className="text-blue-600">
								{packageCryptoArchDataFix?.price}
							</span>{" "}
							<span className="font-normal">
								{packageCryptoArchDataFix?.cryptoArch?.arch?.name}(
								{packageCryptoArchDataFix?.cryptoArch?.arch?.symbol}) -{" "}
								{packageCryptoArchDataFix?.cryptoArch?.crypto?.name}(
								{packageCryptoArchDataFix?.cryptoArch?.crypto?.symbol})
							</span>
						</div>
						<div className="address cursor-pointer font-bold text-base text-slate-800 mb-4">
							Address:{" "}
							<span
								className="font-normal w-75 overflow-hidden overflow-ellipsis whitespace-nowrap"
								onClick={handleCopyToClipboard}
							>
								{isCopied
									? "Text copied to clipboard!"
									: packageCryptoArchDataFix?.cryptoArch?.companyAddress}
							</span>
							<span className="ml-2 btn-inner--icon">
								<i className="ni text-blue-600 ni-ungroup"></i>
							</span>
						</div>
						<div className="font-bold text-base text-slate-800 mb-4">
							Note:{" "}
							<span className="font-normal">
								Please complete your purchase by transferring the package price
								in cryptocurrency to our company's designated address. After the
								transfer is completed, kindly provide the transaction ID for
								confirmation of your purchase.
							</span>
						</div>
						<form onSubmit={formik.handleSubmit}>
							<TextInput
								labelShrink
								fieldName="transactionId"
								label="Transaction address"
								placeholder="Paste transaction address here"
								formik={formik}
							/>

							<Row className="mt-4 mx-0 justify-between">
								<Button
									className="!flex flex-row align-items-center h-12"
									color="primary"
									onClick={() =>
										router.push(
											`/shop/paymentmethod/${packageCryptoArchDataFix?.package?.id}`
										)
									}
								>
									Back
								</Button>
								<Button
									className="!flex flex-row align-items-center h-12"
									color="success"
									type="submit"
								>
									Check transaction
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
