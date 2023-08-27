import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
	archActions,
	fetchCryptoArches,
} from "../../../store/features/archSlice";
import { Badge } from "reactstrap";
import SnackAlert from "../../Dynamic/SnackAlert";
import CryptoArchEdit from "./CryptoArchEdit";
import CryptoArchDelete from "./CryptoArchDelete";

export default function CryptoArchTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.arch.snackMessage);
	const error = useSelector((state) => state.arch.error);

	React.useEffect(() => {
		if (snackMessage != "") handleOpenSnack();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = (text) => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(archActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.arch.loadingData);
	const data = useSelector((state) => state.arch.cryptoData);

	const { id } = router.query;

	React.useEffect(() => {
		dispatch(fetchCryptoArches({ id }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "cryptoId",
			headerName: "Crypto ID",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.cryptoId}</div>
					</div>
				);
			},
		},
		{
			field: "idSmartContract",
			headerName: "Smart contract ID",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.idSmartContract}</div>
					</div>
				);
			},
		},
		{
			field: "decimal",
			headerName: "Decimal",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.decimal}</div>
					</div>
				);
			},
		},
		{
			field: "isStableCoin",
			headerName: "Stable coin",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.isStableCoin ? (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-success" />
									Yes
								</Badge>
							) : (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-danger" />
									No
								</Badge>
							)}
						</div>
					</div>
				);
			},
		},
		{
			field: "isCoin",
			headerName: "Coin",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.isCoin ? (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-success" />
									Yes
								</Badge>
							) : (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-danger" />
									No
								</Badge>
							)}
						</div>
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
