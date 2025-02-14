"use client";

import type {
	ColumnDef,
	ColumnFiltersState,
	Row,
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
import { memo, useCallback, useRef, useState } from "react";

import { ActionConfirmModal } from "@/components/dialogs";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useWorkflowDispatcher, type ActionType } from "@/hooks";
import {
	LetterTableColumns,
	type LetterColumnDefType,
	type LetterType,
} from "@/types/letter_module";
import { Trash, UndoDot } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ActionConfirmModalRef } from "../dialogs/ActionConfirmModal";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import TablePagination from "./TablePagination";
import ViewOptions from "./ViewOptions";

interface DataTableProps {
	columns: LetterColumnDefType;
	data: LetterType[];
	param: string;
}

function DataTable({ columns, data, param }: DataTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		[LetterTableColumns.ID]: false,
	});
	const [rowSelection, setRowSelection] = useState({});
	const [globalFilter, setGlobalFilter] = useState("");

	const modelRef = useRef<ActionConfirmModalRef>(null);
	const router = useRouter();
	const pathname = usePathname();

	const normalizeText = (text: string): string => {
		// Normalize the text to a consistent form
		return text
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase();
	};

	const globalFilterFn = (
		row: Row<LetterType>,
		columnId: string,
		filterValue: string
	): boolean => {
		const cellValue = row.getValue(columnId) as string;
		const normalizedCellValue = normalizeText(cellValue).toLowerCase();
		const normalizedFilterValue = filterValue.toLowerCase();

		return normalizedCellValue.includes(normalizedFilterValue);
	};

	const table = useReactTable({
		data,
		columns: columns as unknown as ColumnDef<LetterType, any>[],
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
			globalFilter,
		},

		filterFns: {
			global: globalFilterFn,
		},
	});

	const { mutate } = useWorkflowDispatcher();

	const handleDelete = async (otp?: string) => {
		const selectedRowIds = Object.keys(rowSelection);

		const ids = selectedRowIds
			.map((id) =>
				table
					.getRowModel()
					.rows.find((row) => row.id === id)
					?.getValue("id")
			)
			.filter((refNum): refNum is string => !!refNum);

		if (ids.length > 0) {
			switch (param) {
				case "draft":
					await handleBatchAction("moveToTrash_batch", ids);
					break;
				case "trash":
					if (otp !== undefined) {
						await handleBatchAction("permanently_delete_batch", ids, otp);
					} else {
						toast.dismiss();
						toast.error("OTP ይህ ቅድሚያ የማስወገጃ ስርዓት የሚፈልጉትን ማነስ አልተቻለም።");
					}
					break;
				default:
					toast.dismiss();
					toast.error("እባክዎን ከዚህ ስርዓት እንደገና ይሞክሩ።");
			}
		} else {
			toast.dismiss();
			toast.error("እባክዎን የተመረጡ ደብዳቤዎች አልተገኙም።");
		}
	};

	const handleRestore = async () => {
		const selectedRowIds = Object.keys(rowSelection);

		const ids = selectedRowIds
			.map((id) =>
				table
					.getRowModel()
					.rows.find((row) => row.id === id)
					?.getValue("id")
			)
			.filter((refNum): refNum is string => !!refNum);

		if (ids.length > 0) {
			if (param === "trash") {
				await handleBatchAction("restoreFromTrash_batch", ids);
			} else {
				toast.error("ይህ ዓይነት የተመረጠ እንዲሆን አልተዘጋጅም።");
			}
		} else {
			toast.error("እባክዎን የተመረጡ ደብዳቤዎች አልተገኙም።");
		}
	};

	const handleBatchAction = useCallback(
		async (actionType: ActionType, id: string[], otp?: string) => {
			try {
				await mutate({
					actionType,
					params: { id, otp },
				});
				toast.dismiss();
				toast.success("የተመረጡት ደብዳቤዎች በቋሚነት እንዲጠፉ ተደርጓል።");
			} catch (error) {
				toast.dismiss();
				toast.error("የተመረጡት ደብዳቤዎችን በቋሚነት ማስወግድ አልተቻለም።");
			}
		},
		[mutate]
	);

	const isDeleteButtonDisabled = Object.keys(rowSelection).length === 0;

	return (
		<div className="flex h-full w-full flex-col justify-between">
			<div className="mb-2 flex grid-cols-3 flex-wrap items-center gap-4">
				<Input
					value={globalFilter}
					onChange={(event) => setGlobalFilter(event.target.value)}
					placeholder="ደብዳቤ መፈለጊያ"
					className="mr-auto h-9 max-w-sm py-0"
				/>
				<div className="flex gap-2">
					{param === "trash" ? (
						<ActionConfirmModal
							triggerButtonIcon={<Trash size={15} />}
							disabledButton={isDeleteButtonDisabled}
							triggerButtonText="አጥፋ"
							ref={modelRef}
							triggerButtonVariant={isDeleteButtonDisabled ? "outline" : "destructive"}
							dialogTitle="በቋሚነት ያስወግዱ"
							dialogDescription="እርግጠኛ ነዎት እነዚህን ደብዳቤዎች እስከመጨረሻው መሰረዝ ይፈልጋሉ? እባክዎ ለመቀጠል ውሳኔዎን ያረጋግጡ?"
							confirmButtonText="አጥፋ"
							cancelButtonText="አይ ተመለስ"
							onConfirm={async () => {
								const otp: string | undefined = modelRef.current?.getOTP();
								if (!otp) return;
								await handleDelete(otp);
							}}
							requiresAuth={true}
						/>
					) : null}
					{param === "draft" ? (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant={isDeleteButtonDisabled ? "outline" : "default"}
									disabled={isDeleteButtonDisabled}
									size={"sm"}
									className={`${isDeleteButtonDisabled ? "" : "bg-red-500"} flex gap-2 `}
								>
									<Trash size={15} />
									አጥፋ
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>በቋሚነት ያስወግዱ?</AlertDialogTitle>
									<AlertDialogDescription>
										እርግጠኛ ነዎት እነዚህን ደብዳቤዎች እስከመጨረሻው መሰረዝ ይፈልጋሉ? እባክዎ ለመቀጠል ውሳኔዎን ያረጋግጡ?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>አይ ተመለስ</AlertDialogCancel>
									<AlertDialogAction
										onClick={async () => {
											await handleDelete();
										}}
									>
										አጥፋ
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					) : null}
					{param === "trash" && (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant={isDeleteButtonDisabled ? "outline" : "default"}
									disabled={isDeleteButtonDisabled}
									size={"sm"}
									className="flex gap-2"
								>
									<UndoDot size={15} /> ወደ ቦታው መልስ
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>ከማስወገጃ ወደ ቀድሞ ቦታው መልስ</AlertDialogTitle>
									<AlertDialogDescription>
										እርግጠኛ ነዎት እነዚህን ደብዳቤዎች ወደ ቦታው መመለስ ይፈልጋሉ? እባክዎ ለመቀጠል ውሳኔዎን ያረጋግጡ?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>አይ ተመለስ</AlertDialogCancel>
									<AlertDialogAction
										onClick={async () => {
											await handleRestore();
										}}
									>
										መልስ
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					)}
					<ViewOptions table={table} />
				</div>
			</div>

			<div className="my-3 h-full rounded-md border">
				<Table className="h-full">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => {
								const id = row.getValue("id");
								return (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
										className="cursor-pointer"
										onClick={(e) => {
											if (
												!(e.target as HTMLInputElement).closest('input[type="checkbox"]')
											) {
												router.push(`${pathname}/${id}`);
											}
										}}
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
