import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
	className?: string;
	color?: string;
}

export default function LoadingModal({ className = "", color }: Props) {
	return (
		<div
			style={{
				position: "absolute",
				backdropFilter: "blur(3px)",
				top: "0",
				left: "0",
				height: "100%",
				width: "100%",
				zIndex: "5",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: "0.4375rem",
			}}
		>
			<span
				className={`${className} ${color} flex flex-row align-items-center justify-center`}
			>
				<CircularProgress color={color ? "inherit" : "primary"} />
			</span>
		</div>
	);
}
