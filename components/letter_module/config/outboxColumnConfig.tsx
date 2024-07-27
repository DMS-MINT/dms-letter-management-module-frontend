import { ColumnHeader } from "@/components/shared/tableComponents";
import { Checkbox } from "@/components/ui/checkbox";
import {
	LetterColumnDefType,
	LetterTableColumns,
	ParticipantType,
	RoleEnum,
	columnTranslation,
	letterTypeTranslations,
} from "@/types/letter_module";
import { convertToEthiopianDate, getParticipantInfo } from "@/utils";
import { Circle } from "lucide-react";
import StatusBadge from "../StatusBadge";

export const outboxTableColumns: LetterColumnDefType = [
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
						has_read ? "rounded-full bg-primary text-transparent" : "text-gray-400"
					}
				/>
			);
		},
		size: 30,
	},
	{
		accessorKey: LetterTableColumns.REFERENCE_NUMBER,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.REFERENCE_NUMBER]}
			/>
		),
		size: 250,
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
			return <p className="limited-rows">{recipients ? recipients : ""}</p>;
		},
		size: 500,
	},
	{
		accessorKey: LetterTableColumns.SUBJECT,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.SUBJECT]}
			/>
		),
		size: 400,
		cell: ({ row }) => {
			const subject: string = row.getValue(LetterTableColumns.SUBJECT);

			return <p className="limited-chars">{subject}</p>;
		},
	},
	{
		accessorKey: LetterTableColumns.LETTER_TYPE,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.LETTER_TYPE]}
			/>
		),
		size: 50,
		cell: ({ row }) => {
			const letter_type: string = row.getValue(LetterTableColumns.LETTER_TYPE);

			return (
				<p className="limited-rows">
					{letterTypeTranslations[letter_type.toUpperCase()]}
				</p>
			);
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
				className="limited-rows ml-auto w-fit"
			/>
		),

		cell: ({ row }) => {
			const submitted_at: string = row.getValue(LetterTableColumns.SUBMITTED_AT);
			return (
				<div className="limited-rows px-4 py-1 text-right font-medium">
					{convertToEthiopianDate(submitted_at)}
				</div>
			);
		},
		size: 50,
	},
];
