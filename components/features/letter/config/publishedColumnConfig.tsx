import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "@/components/shared/tableComponents";
import { Circle } from "lucide-react";
import { convertToEthiopianDate, getParticipantInfo } from "@/utils";
import StatusBadge from "../miscellaneous/StatusBadge";
import {
	LetterTableColumns,
	LetterType,
	ParticipantType,
	RoleEnum,
	columnTranslation,
	letterTypeTranslations,
} from "@/types/letter_module";

export const publishedTableColumns: ColumnDef<LetterType>[] = [
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
	},
	{
		accessorKey: LetterTableColumns.REFERENCE_NUMBER,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.REFERENCE_NUMBER]}
			/>
		),
	},
	{
		accessorKey: LetterTableColumns.SENDER,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.SENDER]}
			/>
		),
		cell: ({ row }) => {
			const participants: ParticipantType[] = row.original.participants;

			const senders = getParticipantInfo(RoleEnum.AUTHOR, participants);
			return <p>{senders ? senders : ""}</p>;
		},
	},
	{
		accessorKey: LetterTableColumns.RECIPIENT,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.RECIPIENT]}
			/>
		),
		cell: ({ row }) => {
			const participants: ParticipantType[] = row.original.participants;

			const recipients = getParticipantInfo(
				RoleEnum["PRIMARY RECIPIENT"],
				participants
			);
			return <p>{recipients ? recipients : ""}</p>;
		},
	},
	{
		accessorKey: LetterTableColumns.SUBJECT,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.SUBJECT]}
			/>
		),
	},
	{
		accessorKey: LetterTableColumns.LETTER_TYPE,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.LETTER_TYPE]}
			/>
		),
		size: 10,
		cell: ({ row }) => {
			const letter_type: string = row.getValue(LetterTableColumns.LETTER_TYPE);

			return <p>{letterTypeTranslations[letter_type.toUpperCase()]}</p>;
		},
	},
	{
		accessorKey: LetterTableColumns.CURRENT_STATE,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.CURRENT_STATE]}
			/>
		),
		cell: ({ row }) => {
			const current_state: string = row.getValue(LetterTableColumns.CURRENT_STATE);
			return (
				<div className="min-w-36">
					<StatusBadge current_state={current_state} />
				</div>
			);
		},
	},
	{
		accessorKey: LetterTableColumns.SUBMITTED_AT,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.SUBMITTED_AT]}
				className="w-fit ml-auto"
			/>
		),

		cell: ({ row }) => {
			const submitted_at: string = row.getValue(LetterTableColumns.SUBMITTED_AT);
			return (
				<div className="text-right font-medium px-4 py-1">
					{convertToEthiopianDate(submitted_at)}
				</div>
			);
		},
		size: 50,
	},
];
