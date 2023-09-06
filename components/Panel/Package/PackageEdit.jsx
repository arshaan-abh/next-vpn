import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "/components/Form/TextInput";
import LoadingModal from "../../Dynamic/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { extractNumbers } from "../../../utils/handleNumbers";
import { updatePackage } from "../../../store/features/packageSlice";

const validationSchema = yup.object().shape({
	title: yup.string().required("Name is required"),
	duration: yup
		.number()
		.typeError("Duration should be a number")
		.required("Duration is required"),
	userCount: yup
		.number()
		.typeError("User count should be a number")
		.required("User count is required"),
	trafficAmount: yup
		.number()
		.typeError("Traffic should be a number")
		.required("Traffic is required"),
});

export default function PackageEdit({ currentValue }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const loadingAction = useSelector((state) => state.package.loadingAction);
	const snackMessage = useSelector((state) => state.package.snackMessage);

	React.useEffect(() => {
		if (!loadingAction && snackMessage !== "") {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snackMessage]);

	const formik = useFormik({
		initialValues: {
			title: currentValue.title,
			duration: extractNumbers(currentValue.duration),
			userCount: currentValue.userCount,
			trafficAmount: extractNumbers(currentValue.trafficAmount),
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			let valueFix = {
				title: values.title,
				duration: `${values.duration}`,
				userCount: values.userCount,
				trafficAmount: `${values.trafficAmount}GB`,
			};
			dispatch(updatePackage({ id: currentValue.id, data: valueFix }));
		},
	});

	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<>
			<Button
				size="sm"
				outline
				color="warning"
				type="button"
				onClick={() => setModalOpen(!modalOpen)}
			>
				Edit
			</Button>

			<Modal
				toggle={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
				centered
			>
				{loadingAction ? <LoadingModal /> : null}
				<div className="modal-header">
					<h3>Edit package</h3>
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
						<TextInput
							labelShrink
							className="mb-4"
							fieldName="title"
							label="Title"
							placeholder="Package title"
							formik={formik}
						/>

						<TextInput
							labelShrink
							className="mb-4"
							type="number"
							fieldName="duration"
							label="Duration"
							placeholder="Duration in days"
							adornmentText="Days"
							formik={formik}
						/>

						<TextInput
							labelShrink
							className="mb-4"
							type="number"
							fieldName="userCount"
							label="User count"
							placeholder="Number of Users"
							adornmentText="Users"
							formik={formik}
						/>

						<TextInput
							labelShrink
							type="number"
							fieldName="trafficAmount"
							label="Traffic"
							placeholder="VPN Traffic in GB"
							adornmentText="GB"
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
					<Button color="warning" type="submit" onClick={formik.handleSubmit}>
						Edit
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
