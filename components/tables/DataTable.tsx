"use client";

import type {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { memo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { LetterColumnDefType, LetterType } from "@/types/letter_module";
import { LetterTableColumns } from "@/types/letter_module";
import { usePathname, useRouter } from "next/navigation";
import TablePagination from "./TablePagination";
import ViewOptions from "./ViewOptions";
interface DataTableProps {
	columns: LetterColumnDefType;
	data: LetterType[];
}

function DataTable({ columns, data }: DataTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const router = useRouter();
	const pathname = usePathname();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="flex h-full w-full flex-col justify-between">
			<div className="mb-2 flex grid-cols-3  flex-wrap items-center gap-4">
				<Input
					value={
						(table
							.getColumn(LetterTableColumns.REFERENCE_NUMBER)
							?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table
							.getColumn(LetterTableColumns.REFERENCE_NUMBER)
							?.setFilterValue(event.target.value)
					}
					placeholder="የደብዳቤ ቁጥር"
					className="mr-auto h-9 max-w-sm py-0"
				/>
				<ViewOptions table={table} />
			</div>

			<div className="my-3 h-full rounded-md border">
				<Table className="h-full">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => {
								const reference_number = row.getValue("reference_number");
								return (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
										onClick={() => router.push(`${pathname}/${reference_number}`)}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								);
							})
						) : (
							<TableRow className="hover:bg-transparent">
								<TableCell colSpan={columns.length} className="h-60 text-center">
									ምንም ደብዳቤዎች አልተገኙም።
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<TablePagination table={table} />
		</div>
	);
}

export default memo(DataTable);
