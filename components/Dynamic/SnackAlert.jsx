import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackAlert = ({ props }) => {
	return (
		<>
			{props.error ? (
				<Snackbar
					open={props.isSnackOpen}
					onClose={props.handleCloseSnack}
					sx={{ direction: "right" }}
				>
					<Alert
						onClose={props.handleCloseSnack}
						severity="error"
						sx={{ width: "100%" }}
					>
						{props.snackMessage}
					</Alert>
				</Snackbar>
			) : (
				<Snackbar
					open={props.isSnackOpen}
					onClose={props.handleCloseSnack}
					sx={{ direction: "right" }}
				>
					<Alert
						onClose={props.handleCloseSnack}
						severity="success"
						sx={{ width: "100%" }}
					>
						{props.snackMessage}
					</Alert>
				</Snackbar>
			)}
		</>
	);
};

export default SnackAlert;
