import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchArches } from "../../../store/features/archSlice";
import ArchEdit from "./ArchEdit";
import ArchDelete from "./ArchDelete";

export default function ArchTable() {
	const router = useRouter();
	const dispatch = useDispatch();

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
					</div>
				);
			},
		},
	];

	return (
		<MUIDataGrid
			columns={columns}
			rows={data}
			pageSize={6}
			rowHeight={70}
			loading={loadingData}
			pagination
		/>
	);
}
