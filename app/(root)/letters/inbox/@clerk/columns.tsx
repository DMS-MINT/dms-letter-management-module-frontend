"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "@/components/dataTable";
import { Circle, Dot } from "lucide-react";
import { ColumnEnum } from "@/typing/enum";
import { columnDictionary } from "@/typing/dictionary";
import { Badge } from "@/components/ui/badge";
// import { Badge } from "@/widgets/common";

export type Letter = {
  id: string;
  is_read: boolean;
  letter_id: string;
  sender: string;
  subject: string;
  type: string;
  received_at: string;
  status: string;
  sent_to: string;
};

export const columns: ColumnDef<Letter>[] = [
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
    accessorKey: "is_read",
    header: () => <Circle size={13} className="text-gray-400" />,
    cell: ({ row }) => {
      const is_read: boolean = row.getValue("is_read");
      return (
        <Circle
          size={13}
          className={
            is_read
              ? "bg-primary rounded-full text-transparent"
              : "text-gray-400"
          }
        />
      );
    },
  },
  {
    accessorKey: ColumnEnum.LETTER_ID,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.LETTER_ID]}
      />
    ),
  },
  {
    accessorKey: ColumnEnum.SENDER,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.SENDER]}
      />
    ),
  },
  {
    accessorKey: ColumnEnum.SENT_TO,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={columnDictionary[ColumnEnum.SENT_TO]}
      />
    ),
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
    accessorKey: ColumnEnum.TYPE,
    header: ({ column }) => (
      <ColumnHeader column={column} title={columnDictionary[ColumnEnum.TYPE]} />
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
      return (
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-6 "
        >
          አልተቀመጠም
        </Badge>
        // <Badge
        // <Dot />
        //   status={status}
        //   style={"text-orange-700 bg-orange-50"}
        //   show_dot={false}
        // />
        // <Badge variant="outline">Outline</Badge>
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
        <div className="text-right font-medium px-4 py-1">{received_at}</div>
      );
    },
  },
];
