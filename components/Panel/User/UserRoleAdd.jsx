import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { addUserRole, fetchUserRoles } from "../../../store/features/userSlice";
import { fetchRoles } from "../../../store/features/roleSlice";
import AutoCompleteInput from "../../Form/AutoCompleteInput";

const validationSchema = yup.object().shape({
	roleId: yup.string().required("Role is required"),
});

export default function UserRoleAdd() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const loadingAction = useSelector((state) => state.user.loadingAction);
	const snackMessage = useSelector((state) => state.user.snackMessage);
	const roleData = useSelector((state) => state.role.data);

	React.useEffect(() => {
		dispatch(fetchRoles());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
			dispatch(fetchUserRoles(id[0]));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			userId: id[1],
			roleId: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(addUserRole(values));
		},
	});

	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<>
			<Button
				color="primary"
				size="sm"
				onClick={() => setModalOpen(!modalOpen)}
			>
				<span className="btn-inner--icon">
					<i className="ni ni-fat-add"></i>
				</span>
				<span className="btn-inner--text">Set Role</span>
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Set role</h3>
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<ModalBody>
					<form>
						<AutoCompleteInput
							labelShrink
							fieldName="roleId"
							labelName="name"
							valueName="_id"
							label="Role"
							placeholder="Select a role"
							options={roleData}
							formik={formik}
						/>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						color="secondary"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						Close
					</Button>
					<Button color="success" type="submit" onClick={formik.handleSubmit}>
						Set
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
