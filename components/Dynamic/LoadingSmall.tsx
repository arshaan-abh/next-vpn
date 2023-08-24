import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
	className?: string;
	color?: string;
}

export default function LoadingSmall({ className = "", color }: Props) {
	return (
		<span className={`${className} ${color} ml-3 flex flex-row align-items-center justify-center`}>
			<CircularProgress color={color ? "inherit" : "primary"} size="1.4rem" />
		</span>
	);
};

