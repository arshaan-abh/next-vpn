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

	const { id } = router.query;

	const snackMessage = useSelector((state) => state.arch.snackMessage);
	const loadingAction = useSelector((state) => state.arch.loadingAction);
	const error = useSelector((state) => state.arch.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchCryptoArches({ id }));
		}
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

	React.useEffect(() => {
		dispatch(fetchCryptoArches({ id }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "crypto",
			headerName: "Crypto",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.crypto.name}</div>
					</div>
				);
			},
		},
		{
			field: "smartContractId",
			headerName: "Smart contract ID",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.smartContractId}</div>
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
			field: "companyAddress",
			headerName: "Company address",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.companyAddress}</div>
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
