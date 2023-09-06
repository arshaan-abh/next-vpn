import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import CryptoArchEdit from "./PackageCryptoArchEdit";
import CryptoArchDelete from "./PackageCryptoArchDelete";
import {
	fetchPackageCryptoArches,
	packageActions,
} from "../../../store/features/packageSlice";
import { formatDate } from "../../../utils/handleDates";

export default function PackageCryptoArchTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.package.snackMessage);
	const loadingAction = useSelector((state) => state.package.loadingAction);
	const error = useSelector((state) => state.package.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchPackageCryptoArches(id));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = (text) => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(packageActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.package.loadingData);
	const data = useSelector((state) => state.package.cryptoData);

	const { id } = router.query;

	React.useEffect(() => {
		dispatch(fetchPackageCryptoArches(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "cryptoarch",
			headerName: "Crypto arch",
			flex: 1,
			minWidth: 320,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.cryptoArch.arch.name}(
							{params.row.cryptoArch.arch.symbol}) -{" "}
							{params.row.cryptoArch.crypto.name}(
							{params.row.cryptoArch.crypto.symbol})
						</div>
					</div>
				);
			},
		},
		{
			field: "price",
			headerName: "Price",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.price}</div>
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
			field: "functions",
			headerName: "functions",
			flex: 1,
			minWidth: 180,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<CryptoArchEdit currentValue={params.row} />
						<CryptoArchDelete id={params.row.id} />
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
