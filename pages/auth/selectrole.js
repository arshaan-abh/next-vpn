import React, { useState } from "react";
import {
	Button,
	Card,
	CardBody,
	Col,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Form,
	FormGroup,
	Row,
	UncontrolledDropdown,
} from "reactstrap";
import Auth from "/layouts/Auth.js";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import SelectInput from "@mui/material/Select/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { login, loginActions } from "../../store/features/loginSlice";
import LoadingSmall from "../../components/Dynamic/LoadingSmall";
import SnackAlert from "../../components/Dynamic/SnackAlert";

const validationSchema = yup.object().shape({
	role: yup.string().required("Role is required"),
});

function SelectPanel() {
	const router = useRouter();
	const [selectedDashboard, setSelectedDashboard] = useState("Admin");

	React.useEffect(() => {
		const token = getLocalStorageItem("token");
		if (!token) router.push("/auth/login");
	}, []);

	return (
		<Col lg="5" md="7">
			<Card className="bg-secondary shadow border-0">
				<CardBody className="px-lg-5 py-lg-5">
					<div className="text-center text-muted mb-4">
						<small>Select panel</small>
					</div>
					<Form role="form">
						<FormGroup className="flex gap-4 items-center mb-0">
							<label
								className="form-control-label mb-0"
								htmlFor="select-dashboard"
							>
								Select dashboard
							</label>
							<UncontrolledDropdown>
								<DropdownToggle caret type="button" id="select-dashboard">
									{selectedDashboard}
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem
										href="#pablo"
										onClick={(e) => {
											e.preventDefault();
											setSelectedDashboard("Admin");
										}}
									>
										Admin
									</DropdownItem>
									<DropdownItem
										href="#pablo"
										onClick={(e) => {
											e.preventDefault();
											setSelectedDashboard("User");
										}}
									>
										User
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							<Button
								className="mt-4"
								color="primary"
								type="button"
								onClick={() => router.push("/panel")}
							>
								Sign in
							</Button>
						</FormGroup>
					</Form>
				</CardBody>
			</Card>
			<Row className="mt-3">
				<Col className="text-slate-300" xs="6">
					<Link href="/auth/login">
						Logout from account
					</Link>
				</Col>
				<Col className="text-right" xs="6"></Col>
			</Row>
		</Col>
	);
}

SelectPanel.layout = Auth;

export default SelectPanel;
