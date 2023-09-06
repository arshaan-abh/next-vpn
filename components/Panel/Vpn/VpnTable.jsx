import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchVpns, vpnActions } from "../../../store/features/vpnSlice";
import VpnEdit from "./VpnEdit";
import VpnDelete from "./VpnDelete";
import SnackAlert from "../../Dynamic/SnackAlert";
import VpnAddPackage from "./VpnAddPackage";

export default function VpnTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.vpn.snackMessage);
	const loadingAction = useSelector((state) => state.vpn.loadingAction);
	const error = useSelector((state) => state.vpn.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchVpns());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = (text) => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(vpnActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.vpn.loadingData);
	const data = useSelector((state) => state.vpn.data);

	React.useEffect(() => {
		dispatch(fetchVpns());
	}, []);

	const columns = [
		{
			field: "vpnName",
			headerName: "Name",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.vpnName}</div>
					</div>
				);
			},
		},
		{
			field: "username",
			headerName: "Username",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.username}</div>
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
						<div className="text">{params.row.password}</div>
					</div>
				);
			},
		},
		{
			field: "privateKey",
			headerName: "Private key",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.privateKey}</div>
					</div>
				);
			},
		},
		{
			field: "functions",
			headerName: "functions",
			flex: 1,
			minWidth: 300,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<VpnEdit currentValue={params.row} />
						<VpnDelete id={params.row.id} />
						<VpnAddPackage id={params.row.id} />
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
