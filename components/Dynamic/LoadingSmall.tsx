import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
	className?: string;
}

export default function LoadingSmall({ className = "" }: Props) {
	return (
		<span className={`${className} ml-2`}>
			<CircularProgress size="1.5rem" />
		</span>
	);
};

