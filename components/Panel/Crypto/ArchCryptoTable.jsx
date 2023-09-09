import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import {
	cryptoActions,
	fetchArchCryptos,
} from "../../../store/features/cryptoSlice";

export default function ArchCryptoTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const snackMessage = useSelector((state) => state.crypto.snackMessage);
	const loadingAction = useSelector((state) => state.crypto.loadingAction);
	const error = useSelector((state) => state.crypto.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchArchCryptos({ id }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(cryptoActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.crypto.loadingData);
	const data = useSelector((state) => state.crypto.archData);
	React.useEffect(() => {
		dispatch(fetchArchCryptos({ id }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.arch.name}</div>
					</div>
				);
			},
		},
		{
			field: "symbol",
			headerName: "Symbol",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.arch.symbol}</div>
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
