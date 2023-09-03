import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import { exchangeActions, fetchExchangeVersions } from "../../../store/features/exchangeSlice";
import ExchangeVersionEdit from "./ExchangeVersionEdit";
import ExchangeVersionDelete from "./ExchangeVersionDelete";

export default function ExchangeVersionTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const snackMessage = useSelector((state) => state.exchange.snackMessage);
	const loadingAction = useSelector((state) => state.exchange.loadingAction);
	const error = useSelector((state) => state.exchange.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchExchangeVersions(id));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = (text) => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(exchangeActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.exchange.loadingData);
	const data = useSelector((state) => state.exchange.versionData);

	React.useEffect(() => {
		dispatch(fetchExchangeVersions(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "from_to",
			headerName: "From To",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.to.from_to}</div>
					</div>
				);
			},
		},
		{
			field: "to_from",
			headerName: "To From",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.to.to_from}</div>
					</div>
				);
			},
		},
		{
			field: "functions",
			headerName: "functions",
			flex: 1,
			minWidth: 180,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<ExchangeVersionEdit currentValue={params.row} />
						<ExchangeVersionDelete id={params.row.id} />
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
				rows={data}
				pageSize={6}
				rowHeight={70}
				loading={loadingData}
				pagination
			/>
		</>
	);
}
