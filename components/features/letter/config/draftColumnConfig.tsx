"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "@/components/shared/tableComponents";
import { Circle } from "lucide-react";
import { letterTableColumnLookup, letterTypeLookup } from "@/typing/dictionary";
import { LetterTableColumnEnum, ParticipantRolesEnum } from "@/typing/enum";
import {
	ILetterListInputSerializer,
	IParticipantInputSerializer,
} from "@/typing/interface";
import { getParticipantInfo } from "@/utils";
import StatusBadge from "../miscellaneous/StatusBadge";
import { formatEthiopianDate } from "@/typing/enum/EthiopianMonths";

export const draftTableColumns: ColumnDef<ILetterListInputSerializer>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="ሁሉንም ምረጥ"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="ረድፍ ይምረጡ"
			/>
		),
		size: 30,
	},
	{
		accessorKey: "has_read",
		header: () => <Circle size={13} className="text-gray-400" />,
		cell: ({ row }) => {
			const has_read: boolean = row.getValue("has_read");
			return (
				<Circle
					size={13}
					className={
						has_read ? "bg-primary rounded-full text-transparent" : "text-gray-400"
					}
				/>
			);
		},
		size: 30,
	},
	{
		accessorKey: LetterTableColumnEnum.REFERENCE_NUMBER,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={letterTableColumnLookup[LetterTableColumnEnum.REFERENCE_NUMBER]}
			/>
		),
		size: 350,
	},
	{
		accessorKey: LetterTableColumnEnum.RECIPIENT,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={letterTableColumnLookup[LetterTableColumnEnum.RECIPIENT]}
			/>
		),
		cell: ({ row }) => {
			const participants: IParticipantInputSerializer[] =
				row.original.participants;

			const recipients = getParticipantInfo(
				ParticipantRolesEnum["PRIMARY RECIPIENT"],
				participants
			);

			return <p className="limited-rows">{recipients ? recipients : ""}</p>;
		},
		size: 350,
	},
	{
		accessorKey: LetterTableColumnEnum.SUBJECT,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={letterTableColumnLookup[LetterTableColumnEnum.SUBJECT]}
			/>
		),
		size: 400,
		cell: ({ row }) => {
			const subject: string = row.getValue(LetterTableColumnEnum.SUBJECT);

			return <p className="limited-chars">{subject}</p>;
		},
	},
	{
		accessorKey: LetterTableColumnEnum.LETTER_TYPE,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={letterTableColumnLookup[LetterTableColumnEnum.LETTER_TYPE]}
			/>
		),
		size: 30,
		cell: ({ row }) => {
			const letter_type: string = row.getValue(LetterTableColumnEnum.LETTER_TYPE);

			return (
				<p className="limited-rows">
					{letterTypeLookup[letter_type.toUpperCase()]}
				</p>
			);
		},
	},
	{
		accessorKey: LetterTableColumnEnum.CURRENT_STATE,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={letterTableColumnLookup[LetterTableColumnEnum.CURRENT_STATE]}
			/>
		),
		cell: ({ row }) => {
			const current_state: string = row.getValue(
				LetterTableColumnEnum.CURRENT_STATE
			);
			return (
				<div>
					<StatusBadge current_state={current_state} />
				</div>
			);
		},
	},
	{
		accessorKey: LetterTableColumnEnum.CREATED_AT,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={letterTableColumnLookup[LetterTableColumnEnum.CREATED_AT]}
				className="w-fit ml-auto limited-rows"
			/>
		),
		cell: ({ row }) => {
			const created_at: string = row.getValue(LetterTableColumnEnum.CREATED_AT);
			return (
				<div className="text-right font-medium px-4 py-1 limited-rows">
					{created_at ? formatEthiopianDate(created_at) : ""}
				</div>
			);
		},
		size: 30,
	},
	// {
	// 	accessorKey: LetterTableColumnEnum.UPDATED_AT,
	// 	header: ({ column }) => (
	// 		<ColumnHeader
	// 			column={column}
	// 			title={letterTableColumnLookup[LetterTableColumnEnum.UPDATED_AT]}
	// 			className="w-fit ml-auto limited-rows"
	// 		/>
	// 	),
	// 	cell: ({ row }) => {
	// 		const updated_at: string = row.getValue(LetterTableColumnEnum.UPDATED_AT);
	// 		return (
	// 			<div className="text-right font-medium px-4 py-1 limited-rows">
	// 				{updated_at ? formatEthiopianDate(updated_at) : ""}
	// 			</div>
	// 		);
	// 	},
	// 	size: 30,
	// },
];
