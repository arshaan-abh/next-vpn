import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import {
	fetchGroupVersions,
	groupActions,
} from "../../../store/features/groupSlice";
import { formatDate } from "../../../utils/handleDates";
import GroupVersionEdit from "./GroupVersionEdit";
import GroupVersionDelete from "./GroupVersionDelete";

export default function GroupVersionTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const snackMessage = useSelector((state) => state.group.snackMessage);
	const loadingAction = useSelector((state) => state.group.loadingAction);
	const error = useSelector((state) => state.group.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchGroupVersions(id));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(groupActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.group.loadingData);
	const data = useSelector((state) => state.group.versionData);

	React.useEffect(() => {
		dispatch(fetchGroupVersions(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "discount",
			headerName: "Discount",
			flex: 1,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.discount}</div>
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
						<GroupVersionEdit currentValue={params.row} />
						<GroupVersionDelete id={params.row.id} />
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
