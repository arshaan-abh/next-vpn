import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { Badge, Button } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/features/userSlice";
import UserEdit from "./UserEdit";
import UserDelete from "./UserDelete";

export default function UserTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingData = useSelector((state) => state.user.loadingData);
	const data = useSelector((state) => state.user.data);
	const dataFix = data.map((row) => {
		const { postgresId, ...rest } = row;
		return {
			...rest,
			id: postgresId,
		};
	});

	React.useEffect(() => {
		dispatch(fetchUsers());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "username",
			headerName: "Username",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.username}</div>
					</div>
				);
			},
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
			minWidth: 180,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.email}</div>
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
							{params.row.status === "active" && (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-success" />
									Active
								</Badge>
							)}
							{params.row.status === "inactive" && (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-warning" />
									Inactive
								</Badge>
							)}
							{params.row.status === "pending" && (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-info" />
									Pending
								</Badge>
							)}
							{params.row.status === "blocked" && (
								<Badge color="" className="badge-dot mr-4">
									<i className="bg-danger" />
									Blocked
								</Badge>
							)}
						</div>
					</div>
				);
			},
		},
		{
			field: "referralCode",
			headerName: "Referral code",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.referralCode}</div>
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
						<UserEdit currentValue={params.row} />
						<UserDelete id={params.row.id} />
					</div>
				);
			},
		},
	];

	return (
		<MUIDataGrid
			columns={columns}
			rows={dataFix}
			pageSize={6}
			rowHeight={68}
			loading={loadingData}
			pagination
		/>
	);
}
