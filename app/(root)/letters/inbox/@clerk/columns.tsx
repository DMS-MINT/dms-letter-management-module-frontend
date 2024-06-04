"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "@/components/dataTable";
import { Circle, Dot } from "lucide-react";
import { ColumnEnum } from "@/typing/enum";
import { columnDictionary } from "@/typing/dictionary";
import { Badge } from "@/components/ui/badge";
import {
  ILetterListInputSerializer,
  IParticipantInputSerializer,
} from "@/typing";
import { format } from "date-fns";
import { getParticipantInfo, getTranslatedLetterStatus } from "@/utils";

const DateFormat: string = "eee MMM dd";

export const columns: ColumnDef<ILetterListInputSerializer>[] = [
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
    accessorKey: ColumnEnum.ID,
    header: ({ column }) => (
      <ColumnHeader column={column} title={columnDictionary[ColumnEnum.ID]} />
    ),
  },
  {
    accessorKey: "participants",
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.SENDER]}
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
        title={columnDictionary[ColumnEnum.RECIPIENT]}
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
    accessorKey: ColumnEnum.SUBJECT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.SUBJECT]}
      />
    ),
  },
  {
    accessorKey: ColumnEnum.LETTER_TYPE,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.LETTER_TYPE]}
      />
    ),
  },
  {
    accessorKey: ColumnEnum.STATUS,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.STATUS]}
      />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue(ColumnEnum.STATUS);
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
    accessorKey: ColumnEnum.SENT_AT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.SENT_AT]}
        className="w-fit ml-auto"
      />
    ),
    cell: ({ row }) => {
      const sent_at: string = row.getValue(ColumnEnum.SENT_AT);
      return (
        <div className="text-right font-medium px-4 py-1">
          {sent_at ? format(new Date(sent_at), DateFormat) : ""}
        </div>
      );
    },
  },
  {
    accessorKey: ColumnEnum.RECEIVED_AT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.RECEIVED_AT]}
        className="w-fit ml-auto"
      />
    ),
    cell: ({ row }) => {
      const received_at: string = row.getValue(ColumnEnum.RECEIVED_AT);
      return (
        <div className="text-right font-medium px-4 py-1">
          {received_at ? format(new Date(received_at), DateFormat) : ""}
        </div>
      );
    },
  },
  {
    accessorKey: ColumnEnum.CREATED_AT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.CREATED_AT]}
        className="w-fit ml-auto"
      />
    ),
    cell: ({ row }) => {
      const created_at: string = row.getValue(ColumnEnum.CREATED_AT);
      return (
        <div className="text-right font-medium px-4 py-1">
          {created_at ? format(new Date(created_at), DateFormat) : ""}
        </div>
      );
    },
  },
  {
    accessorKey: ColumnEnum.UPDATED_AT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.UPDATED_AT]}
        className="w-fit ml-auto"
      />
    ),
    cell: ({ row }) => {
      const updated_at: string = row.getValue(ColumnEnum.UPDATED_AT);
      return (
        <div className="text-right font-medium px-4 py-1">
          {updated_at ? format(new Date(updated_at), DateFormat) : ""}
        </div>
      );
    },
  },
];
