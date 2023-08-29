import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { Badge } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
	ChargeActions,
	fetchCharges,
} from "../../../store/features/chargeSlice";
import SnackAlert from "../../Dynamic/SnackAlert";
import { formatDate } from "../../../utils/handleDates";

export default function ChargeTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.charge.snackMessage);
	const error = useSelector((state) => state.charge.error);

	React.useEffect(() => {
		if (snackMessage != "") handleOpenSnack();
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = (text) => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(ChargeActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.charge.loadingData);
	const data = useSelector((state) => state.charge.data);
	const dataFix = data.map((row) => {
		const { transactionId, ...rest } = row;
		return {
			...rest,
			id: transactionId,
		};
	});

	React.useEffect(() => {
		dispatch(fetchCharges());
	}, []);

	const columns = [
		{
			field: "id",
			headerName: "Transaction Id",
			flex: 1,
			minWidth: 180,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.id}</div>
					</div>
				);
			},
		},
		{
			field: "createdAt",
			headerName: "Created At",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{formatDate(params.row.createdAt)}</div>
					</div>
				);
			},
		},
		{
			field: "updatedAt",
			headerName: "Updated At",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{formatDate(params.row.updatedAt)}</div>
					</div>
				);
			},
		},
		// {
		// 	field: "deletedAt",
		// 	headerName: "Deleted At",
		// 	flex: 1,
		// 	renderCell: (params) => {
		// 		return (
		// 			<div className="grid-cell">
		// 				<div className="text">
		// 					{params.row.deletedAt ? (
		// 						formatDate(params.row.deletedAt)
		// 					) : (
		// 						<Badge color="" className="badge-dot mr-4">
		// 							<i className="bg-success" />
		// 							Not deleted
		// 						</Badge>
		// 					)}
		// 				</div>
		// 			</div>
		// 		);
		// 	},
		// },
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
