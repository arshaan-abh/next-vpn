import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
	chargeActions,
	fetchAdminCharges,
} from "../../../store/features/chargeSlice";
import SnackAlert from "../../Dynamic/SnackAlert";

export default function ReportChargeTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { username } = router.query;

	const snackMessage = useSelector((state) => state.charge.snackMessage);
	const loadingAction = useSelector((state) => state.charge.loadingAction);
	const error = useSelector((state) => state.charge.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchAdminCharges());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(chargeActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.charge.loadingData);
	const data = useSelector((state) => state.charge.data).find(
		(item) => item.username === username
	)?.Charges;
	const dataFix = data?.map((item) => {
		return { ...item, id: item.transactionId };
	});

	React.useEffect(() => {
		dispatch(fetchAdminCharges());
	}, []);

	const columns = [
		{
			field: "id",
			headerName: "Transaction Id",
			flex: 2,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.id}</div>
					</div>
				);
			},
		},
		{
			field: "arch",
			headerName: "Arch",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.cryptoArch.arch.name}(
							{params.row.cryptoArch.arch.symbol})
						</div>
					</div>
				);
			},
		},
		{
			field: "crypto",
			headerName: "Crypto",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.cryptoArch.crypto.name}(
							{params.row.cryptoArch.crypto.symbol})
						</div>
					</div>
				);
			},
		},
	];

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

			<MUIDataGrid
				columns={columns}
				rows={dataFix}
				pageSize={6}
				rowHeight={70}
				loading={loadingData}
				pagination
			/>
		</>
	);
}
