import { StatusBadge } from "@/components/pills";
import { ColumnHeader } from "@/components/tables";
import { Checkbox } from "@/components/ui/checkbox";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
// import { convertToEthiopianDateAndTime } from "@/lib/utils/convertToEthiopianDate";
import getParticipantInfo from "@/lib/utils/getParticipantInfo";
import type {
	LetterColumnDefType,
	ParticipantDetailType,
} from "@/types/letter_module";
import {
	LetterTableColumns,
	RoleEnum,
	columnTranslation,
	letterTypeTranslations,
} from "@/types/letter_module";
import { CalendarIcon, Circle, CornerRightDown, UserRound } from "lucide-react";

export const inboxTableColumns: LetterColumnDefType = [
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
				onClick={(e) => e.stopPropagation()}
				className="h-5 w-5 "
			/>
		),
		cell: ({ row }) => (
			<div className="relative h-full " onClick={(e) => e.stopPropagation()}>
				<Checkbox
					checked={row.getIsSelected()}
					className="absolute left-[-30] top-1 h-5 w-5"
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="ረድፍ ይምረጡ"
					onClick={(e) => e.stopPropagation()}
				/>
			</div>
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
		accessorKey: LetterTableColumns.ID,
		size: undefined,
		cell: () => null,
		header: () => null,
		enableHiding: true,
	},
	{
		accessorKey: LetterTableColumns.REFERENCE_NUMBER,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.REFERENCE_NUMBER]}
			/>
		),
		size: 60,
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
			const participants: ParticipantDetailType[] = row.original.participants;
			const senders = getParticipantInfo(RoleEnum.AUTHOR, participants);
			const senderList = senders ? senders.split(",") : [];

			return (
				<HoverCard>
					<HoverCardTrigger asChild>
						<p className="line-clamp-1 w-full items-start justify-start text-blue-500">
							{senderList.length > 0 ? senderList[0] : "No Senders"}
						</p>
					</HoverCardTrigger>
					<HoverCardContent className="w-80">
						<div className="space-y-1">
							<div className="flex items-center justify-start gap-2">
								<h4 className="text-sm font-semibold">ከ</h4>
								<CornerRightDown size={15} className="pt-1 text-muted-foreground" />
							</div>
							{senderList.length > 0 ? (
								<div className="space-y-1">
									{senderList.map((sender, index) => (
										<div key={index} className="flex items-center pt-2">
											<UserRound className="mr-2 h-4 w-4 opacity-70" />
											<span className="text-xs text-muted-foreground">
												{sender.trim()}
											</span>
										</div>
									))}
								</div>
							) : (
								<p className="text-xs text-muted-foreground">No participants</p>
							)}
						</div>
					</HoverCardContent>
				</HoverCard>
			);
		},
		size: 350,
	},
	{
		accessorKey: LetterTableColumns.SUBJECT,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.SUBJECT]}
			/>
		),
		size: 350,
		cell: ({ row }) => {
			const subject: string = row.getValue(LetterTableColumns.SUBJECT);
			return (
				<HoverCard>
					<HoverCardTrigger asChild>
						<p className="line-clamp-1 w-[300px] items-start justify-start text-blue-500 ">
							{subject}
						</p>
					</HoverCardTrigger>
					<HoverCardContent className="w-80">
						<div className="space-y-1">
							<div className="flex items-center justify-start gap-2">
								<h4 className="text-sm font-semibold">ጉዳዩ</h4>
								<CornerRightDown size={15} className="pt-1 text-muted-foreground" />
							</div>
							<p className="text-sm text-muted-foreground">{subject}</p>
						</div>
					</HoverCardContent>
				</HoverCard>
			);
			// return <p className="limited-chars">{subject}</p>;
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
				<div>
					<StatusBadge current_state={current_state} />
				</div>
			);
		},
	},
	{
		accessorKey: LetterTableColumns.PUBLISHED_AT,
		header: ({ column }) => (
			<ColumnHeader
				column={column}
				title={columnTranslation[LetterTableColumns.PUBLISHED_AT]}
			/>
		),
		cell: ({ row }) => {
			const received_at: string = row.getValue(LetterTableColumns.PUBLISHED_AT);
			// const { time, date } = convertToEthiopianDateAndTime(received_at);
			return (
				<div className="flex flex-col items-center text-xs font-normal text-muted-foreground">
					{/*<span>{time}</span>*/}
					<span className="flex gap-1 ">
						{" "}
					    <CalendarIcon size={12} />
					    {received_at}
					</span>
				</div>
			);
		},
		size: 50,
	},
];
