"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "@/components/shared/tableComponents";
import { Circle } from "lucide-react";
import { LetterTableColumnEnum, letterTableColumnLookup } from "@/typing";
import { Badge } from "@/components/ui/badge";
import {
  ILetterListInputSerializer,
  IParticipantInputSerializer,
} from "@/typing";
import { format } from "date-fns";
import { getParticipantInfo, getTranslatedLetterStatus } from "@/utils";

const DateFormat: string = "eee MMM dd";

export const archiveTableColumns: ColumnDef<ILetterListInputSerializer>[] = [
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
            has_read
              ? "bg-primary rounded-full text-transparent"
              : "text-gray-400"
          }
        />
      );
    },
  },
  {
    accessorKey: LetterTableColumnEnum.ID,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.ID]}
      />
    ),
  },
  {
    accessorKey: "participants",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.SENDER]}
      />
    ),
    cell: ({ row }) => {
      const participants: IParticipantInputSerializer[] =
        row.getValue("participants");

      const senders = getParticipantInfo("Sender", participants);
      return <div>{senders}</div>;
    },
  },
  {
    accessorKey: "participants",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.RECIPIENT]}
      />
    ),
    cell: ({ row }) => {
      const participants: IParticipantInputSerializer[] =
        row.getValue("participants");

      const recipients = getParticipantInfo("Recipient", participants);
      return <div>{recipients}</div>;
    },
  },

  {
    accessorKey: LetterTableColumnEnum.SUBJECT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.SUBJECT]}
      />
    ),
  },
  {
    accessorKey: LetterTableColumnEnum.LETTER_TYPE,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.LETTER_TYPE]}
      />
    ),
  },
  {
    accessorKey: LetterTableColumnEnum.STATUS,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.STATUS]}
      />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue(LetterTableColumnEnum.STATUS);
      const { amharicTranslation, badgeVariant } =
        getTranslatedLetterStatus(status);
      return (
        <Badge
          variant="default"
          className="rounded-md flex items-center justify-between min-w-fit"
        >
          {amharicTranslation}
        </Badge>
      );
    },
  },
  {
    accessorKey: LetterTableColumnEnum.SENT_AT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.SENT_AT]}
        className="w-fit ml-auto"
      />
    ),
    cell: ({ row }) => {
      const sent_at: string = row.getValue(LetterTableColumnEnum.SENT_AT);
      return (
        <div className="text-right font-medium px-4 py-1">
          {sent_at ? format(new Date(sent_at), DateFormat) : ""}
        </div>
      );
    },
  },
  {
    accessorKey: LetterTableColumnEnum.RECEIVED_AT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.RECEIVED_AT]}
        className="w-fit ml-auto"
      />
    ),
    cell: ({ row }) => {
      const received_at: string = row.getValue(
        LetterTableColumnEnum.RECEIVED_AT
      );
      return (
        <div className="text-right font-medium px-4 py-1">
          {received_at ? format(new Date(received_at), DateFormat) : ""}
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
        className="w-fit ml-auto"
      />
    ),
    cell: ({ row }) => {
      const created_at: string = row.getValue(LetterTableColumnEnum.CREATED_AT);
      return (
        <div className="text-right font-medium px-4 py-1">
          {created_at ? format(new Date(created_at), DateFormat) : ""}
        </div>
      );
    },
  },
  {
    accessorKey: LetterTableColumnEnum.UPDATED_AT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.UPDATED_AT]}
        className="w-fit ml-auto"
      />
    ),
    cell: ({ row }) => {
      const updated_at: string = row.getValue(LetterTableColumnEnum.UPDATED_AT);
      return (
        <div className="text-right font-medium px-4 py-1">
          {updated_at ? format(new Date(updated_at), DateFormat) : ""}
        </div>
      );
    },
  },
];
