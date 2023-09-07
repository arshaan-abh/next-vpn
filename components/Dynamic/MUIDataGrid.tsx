import * as React from "react";
import {
	DataGrid,
	gridPageCountSelector,
	GridPagination,
	useGridApiContext,
	useGridSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";

function Pagination({
	page,
	onPageChange,
	className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
	const apiRef = useGridApiContext();
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<MuiPagination
			className={className}
			shape="circular"
			size="medium"
			count={pageCount}
			page={page + 1}
			onChange={(event, newPage) => {
				onPageChange(event as any, newPage - 1);
			}}
		/>
	);
}

function CustomPagination(props: any) {
	return <GridPagination ActionsComponent={Pagination} {...props} />;
}

interface Props {
	className?: string;
	columns: any;
	rows: any;
	pageSize: number;
	rowHeight: number;
	loading: boolean;
	children?: React.ReactNode;
	pagination?: boolean;
}

export default function MUIDataGrid({
	className,
	columns,
	rows,
	pageSize,
	rowHeight,
	loading,
	pagination,
}: Props) {
	return (
		<div className={`${className} w-full mb-4 overflow-x-auto`}>
			<DataGrid
				sx={{ border: "none", width: "100%" }}
				rows={rows && rows[0]?.id ? rows : []}
				columnHeaderHeight={40}
				rowHeight={rowHeight}
				columns={columns}
				loading={loading}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: pageSize,
						},
					},
				}}
				slots={{
					pagination: CustomPagination,
				}}
				hideFooter={!pagination}
				pageSizeOptions={[pageSize]}
				disableRowSelectionOnClick
			/>
		</div>
	);
}
