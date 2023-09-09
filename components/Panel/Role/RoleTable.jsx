import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { Badge, Button } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, roleActions } from "../../../store/features/roleSlice";
import RoleEdit from "./RoleEdit";
import RoleDelete from "./RoleDelete";
import SnackAlert from "../../Dynamic/SnackAlert";

export default function RoleTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.role.snackMessage);
	const loadingAction = useSelector((state) => state.role.loadingAction);
	const error = useSelector((state) => state.role.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchRoles());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(roleActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.role.loadingData);
	const data = useSelector((state) => state.role.data);
	const dataFix = data.map((row) => {
		const { _id, ...rest } = row;
		return {
			...rest,
			id: _id,
		};
	});

	React.useEffect(() => {
		dispatch(fetchRoles());
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
						<RoleEdit currentValue={params.row} />
						<RoleDelete id={params.row.id} />
						{/* <Button
							size="sm"
							outline
							color="primary"
							type="button"
							onClick={() => {}}
						>
							Front
						</Button>
						<Button
							size="sm"
							outline
							color="info"
							type="button"
							onClick={() => {}}
						>
							Menu
						</Button> */}
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
				rows={dataFix}
				pageSize={6}
				rowHeight={70}
				loading={loadingData}
				pagination
			/>
		</>
	);
}
