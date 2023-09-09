import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { Button } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import {
	fetchPackages,
	packageActions,
} from "../../../store/features/packageSlice";
import PackageEdit from "./PackageEdit";
import PackageDelete from "./PackageDelete";

export default function PackageTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.package.snackMessage);
	const loadingAction = useSelector((state) => state.package.loadingAction);
	const error = useSelector((state) => state.package.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchPackages());
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
	const data = useSelector((state) => state.package.data);

	React.useEffect(() => {
		dispatch(fetchPackages());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "title",
			headerName: "Title",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.title}</div>
					</div>
				);
			},
		},
		{
			field: "duration",
			headerName: "Duration",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.duration} days</div>
					</div>
				);
			},
		},
		{
			field: "userCount",
			headerName: "User count",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.userCount}</div>
					</div>
				);
			},
		},
		{
			field: "trafficAmount",
			headerName: "Traffic",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.trafficAmount}</div>
					</div>
				);
			},
		},
		{
			field: "functions",
			headerName: "functions",
			flex: 1,
			minWidth: 340,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<PackageEdit currentValue={params.row} />
						<PackageDelete id={params.row.id} />
						<Button
							size="sm"
							outline
							color="info"
							type="button"
							onClick={() =>
								router.push(`/panel/admin-packagecryptoarches/${params.row.id}`)
							}
						>
							Crypto arches
						</Button>
						<Button
							size="sm"
							outline
							color="primary"
							type="button"
							onClick={() =>
								router.push(`/panel/admin-packagevpns/${params.row.id}`)
							}
						>
							Vpns
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
				rows={data}
				pageSize={6}
				rowHeight={70}
				loading={loadingData}
				pagination
			/>
		</>
	);
}
