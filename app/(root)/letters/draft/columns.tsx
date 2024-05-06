"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "@/components/dataTable";
import { Circle } from "lucide-react";
import { ColumnEnum } from "@/typing/enum";
import { columnDictionary } from "@/typing/dictionary";

export type Letter = {
  id: string;
  is_read: boolean;
  sender: string;
  subject: string;
  type: string;
  received_at: string;
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
      return <div className="text-right font-medium px-4 py-1">{sent_at}</div>;
    },
  },
];
