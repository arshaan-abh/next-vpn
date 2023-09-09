import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { Badge } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import { Button } from "reactstrap";
import { fetchGroups, groupActions } from "../../../store/features/groupSlice";
import GroupEdit from "./GroupEdit";
import GroupDelete from "./GroupDelete";

export default function GroupTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.group.snackMessage);
	const loadingAction = useSelector((state) => state.group.loadingAction);
	const error = useSelector((state) => state.group.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchGroups());
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
	const data = useSelector((state) => state.group.data);

	React.useEffect(() => {
		dispatch(fetchGroups());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			minWidth: 180,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.name}</div>
					</div>
				);
			},
		},
		{
			field: "status",
			headerName: "Status",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.status ? (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-success" />
									Active
								</Badge>
							) : (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-warning" />
									Inactive
								</Badge>
							)}
						</div>
					</div>
				);
			},
		},
		{
			field: "isDefault",
			headerName: "Default",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">
							{params.row.isDefault ? (
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
						<GroupEdit currentValue={params.row} />
						<GroupDelete id={params.row.id} />
						<Button
							size="sm"
							outline
							color="info"
							type="button"
							onClick={() =>
								router.push(`/panel/admin-groupversions/${params.row.id}`)
							}
						>
							Versions
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
