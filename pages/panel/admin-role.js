import React from "react";
import { Card, CardHeader, Container, Row } from "reactstrap";
import Admin from "/layouts/Admin.js";
import Header from "/components/Headers/Header.js";
import { useRouter } from "next/router";
import RoleTable from "../../components/Panel/Role/RoleTable";
import RoleAdd from "../../components/Panel/Role/RoleAdd";
import SnackAlert from "../../components/Dynamic/SnackAlert";
import { useDispatch, useSelector } from "react-redux";
import { roleActions } from "../../store/features/roleSlice";

function Roll() {
	const router = useRouter();
	const dispatch = useDispatch();

	const snackMessage = useSelector((state) => state.role.snackMessage);
	const error = useSelector((state) => state.role.error);

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

			<Header />
			<Container className="mt--9" fluid>
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0 flex items-center gap-4">
								<h3 className="mb-0">Rolls</h3>
								<RoleAdd />
								{/* <Button
									className="btn-icon ml-lg-auto"
									color="primary"
									size="sm"
								>
									<i className="fas fa-search"></i>
								</Button> */}
							</CardHeader>
							<RoleTable />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}

Roll.layout = Admin;

export default Roll;
