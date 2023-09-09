import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import { Button } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "../../Dynamic/SnackAlert";
import { convertActions, fetchAdminConverts } from "../../../store/features/convertSlice";

export default function AdminConvertTable() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.convert.snackMessage);
	const loadingAction = useSelector((state) => state.convert.loadingAction);
	const error = useSelector((state) => state.convert.error);

	React.useEffect(() => {
		if (snackMessage !== "") handleOpenSnack();

		if (!loadingAction && snackMessage !== "" && !error) {
			dispatch(fetchAdminConverts());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const [isSnackOpen, setIsSnackOpen] = React.useState(false);

	const handleOpenSnack = (text) => {
		setIsSnackOpen(true);
	};

	const handleCloseSnack = () => {
		setIsSnackOpen(false);
		dispatch(convertActions.clearSnackMessage());
	};

	const loadingData = useSelector((state) => state.convert.loadingData);
	const data = useSelector((state) => state.convert.data);
	const dataFix = data.map((row) => {
		const { username, ...rest } = row;
		return {
			...rest,
			id: username,
		};
	});

	React.useEffect(() => {
		dispatch(fetchAdminConverts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			field: "id",
			headerName: "Username",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.id}</div>
					</div>
				);
			},
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => {
				return (
					<div className="grid-cell">
						<div className="text">{params.row.email}</div>
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
						<Button
							size="sm"
							outline
							color="info"
							type="button"
							onClick={() =>
								router.push(`/panel/admin-convertreport/${params.row.id}`)
							}
						>
							Details
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
				rows={dataFix}
				pageSize={6}
				rowHeight={70}
				loading={loadingData}
				pagination
			/>
		</>
	);
}
