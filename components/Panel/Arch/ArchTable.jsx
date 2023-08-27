import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchArches } from "../../../store/features/archSlice";
import ArchEdit from "./ArchEdit";
import ArchDelete from "./ArchDelete";
import { Button } from "reactstrap";
import SnackAlert from "../../Dynamic/SnackAlert";

export default function ArchTable() {
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
		dispatch(roleActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.arch.loadingData);
	const data = useSelector((state) => state.arch.data);

	React.useEffect(() => {
		dispatch(fetchArches());
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
						<div className="text">{params.row.name}</div>
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
						<div className="text">{params.row.symbol}</div>
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
						<ArchEdit currentValue={params.row} />
						<ArchDelete id={params.row.id} />
						<Button
							size="sm"
							outline
							color="info"
							type="button"
							onClick={() =>
								router.push(`/panel/admin-cryptoarches/${params.row.id}`)
							}
						>
							Crypto
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
