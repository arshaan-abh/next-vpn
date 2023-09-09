import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import {
	fetchPackageVpns,
	packageActions,
} from "../../../store/features/packageSlice";

export default function PackageVpnTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const snackMessage = useSelector((state) => state.vpn.snackMessage);
	const loadingAction = useSelector((state) => state.vpn.loadingAction);
	const error = useSelector((state) => state.vpn.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchPackageVpns(id));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(packageActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.package.loadingData);
	const data = useSelector((state) => state.package.vpnData);

	React.useEffect(() => {
		dispatch(fetchPackageVpns(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
