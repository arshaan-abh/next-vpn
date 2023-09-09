import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import { cryptoActions, fetchUserCryptos } from "../../../store/features/cryptoSlice";

export default function UserCryptoTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.crypto.snackMessage);
	const loadingAction = useSelector((state) => state.crypto.loadingAction);
	const error = useSelector((state) => state.crypto.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchUserCryptos());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = (text) => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(cryptoActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.crypto.loadingData);
	const data = useSelector((state) => state.crypto.userData);
	const dataFix = data.map((item) => {
		return { ...item, id: item.crypto?.id };
	});

	React.useEffect(() => {
		dispatch(fetchUserCryptos());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "amount",
			headerName: "Amount",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.amount}</div>
					</div>
				);
			},
		},
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.crypto.name}</div>
					</div>
				);
			},
		},
		{
			field: "symbol",
			headerName: "Symbol",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.crypto.symbol}</div>
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
