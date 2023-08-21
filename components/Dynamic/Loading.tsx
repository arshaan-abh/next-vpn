import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
	className?: string;
	error?: string;
}

export default function Loading({ className = "", error }: Props) {
	return (
		<div
			className={`${className} h-100 w-100 flex justify-center align-items-center`}
		>
			{error ? (
				<div className="w-100 text-center text-base text-red-500 font-medium">
					<span>{error}</span>
				</div>
			) : (
				<CircularProgress />
			)}
		</div>
	);
}
