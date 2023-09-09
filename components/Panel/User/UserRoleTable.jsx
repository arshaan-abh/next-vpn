import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { Badge } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import UserRoleDelete from "./UserRoleDelete";
import { fetchUserRoles, userActions } from "../../../store/features/userSlice";

export default function UserRoleTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const snackMessage = useSelector((state) => state.user.snackMessage);
	const loadingAction = useSelector((state) => state.user.loadingAction);
	const error = useSelector((state) => state.user.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchUserRoles(id[0]));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = () => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(userActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.user.loadingData);
	const data = useSelector((state) => state.user.roleData);
	const dataFix = data.map((row) => {
		const { _id, ...rest } = row;
		return {
			...rest,
			id: _id,
		};
	});

	React.useEffect(() => {
		dispatch(fetchUserRoles(id[0]));
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
									Default
								</Badge>
							) : (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-info" />
									Normal
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
						<UserRoleDelete roleId={params.row.id} />
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
