import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { Badge } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import {
	convertActions,
	fetchUserConverts,
} from "../../../store/features/convertSlice";

export default function UserConvertTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.convert.snackMessage);
	const loadingAction = useSelector((state) => state.convert.loadingAction);
	const error = useSelector((state) => state.convert.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchUserConverts());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(convertActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.convert.loadingData);
	const data = useSelector((state) => state.convert.userData);

	React.useEffect(() => {
		dispatch(fetchUserConverts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "amount",
			headerName: "Amount",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.amount}</div>
					</div>
				);
			},
		},
		{
			field: "from",
			headerName: "From",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.exchangeVersion.exchangeId.from.name}(
							{params.row.exchangeVersion.exchangeId.from.symbol}) x{" "}
							{params.row.exchangeVersion.from_to}
						</div>
					</div>
				);
			},
		},
		{
			field: "to",
			headerName: "To",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.exchangeVersion.exchangeId.to.name}(
							{params.row.exchangeVersion.exchangeId.to.symbol}) x{" "}
							{params.row.exchangeVersion.to_from}
						</div>
					</div>
				);
			},
		},
		{
			field: "convertRequest",
			headerName: "Convert type",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.convertRequest === "buy" ? (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-success" />
									Buy
								</Badge>
							) : (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-warning" />
									Sell
								</Badge>
							)}
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
				rows={data}
				pageSize={6}
				rowHeight={70}
				loading={loadingData}
				pagination
			/>
		</>
	);
}
