import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserVpns, vpnActions } from "../../../store/features/vpnSlice";
import SnackAlert from "../../Dynamic/SnackAlert";
import { Badge } from "reactstrap";
import { formatDate } from "../../../utils/handleDates";

export default function UserVpnTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.vpn.snackMessage);
	const loadingAction = useSelector((state) => state.vpn.loadingAction);
	const error = useSelector((state) => state.vpn.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchUserVpns());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(vpnActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.vpn.loadingData);
	const data = useSelector((state) => state.vpn.userData);

	React.useEffect(() => {
		dispatch(fetchUserVpns());
	}, []);

	const columns = [
		{
			field: "username",
			headerName: "Username",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.vpn.username}</div>
					</div>
				);
			},
		},
		{
			field: "password",
			headerName: "Password",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.vpn.password}</div>
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
		{
			field: "deletedAt",
			headerName: "Deleted At",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.deletedAt ? (
								formatDate(params.row.deletedAt)
							) : (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-success" />
									Not deleted
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
