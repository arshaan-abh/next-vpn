import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
	chargeActions,
	fetchAdminCharges,
} from "../../../store/features/chargeSlice";
import SnackAlert from "../../Dynamic/SnackAlert";
import { Button } from "reactstrap";

export default function AdminChargeTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.charge.snackMessage);
	const error = useSelector((state) => state.charge.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();
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
	const data = useSelector((state) => state.charge.data);
	const dataFix = data.map((row) => {
		const { username, ...rest } = row;
		return {
			...rest,
			id: username,
		};
	});

	React.useEffect(() => {
		dispatch(fetchAdminCharges());
	}, []);

	const columns = [
		{
			field: "id",
			headerName: "Username",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.id}</div>
					</div>
				);
			},
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.email}</div>
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
						<Button
							size="sm"
							outline
							color="info"
							type="button"
							onClick={() =>
								router.push(`/panel/admin-chargereport/${params.row.id}`)
							}
						>
							Details
						</Button>
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
