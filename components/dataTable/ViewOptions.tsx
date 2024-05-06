"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Filter, FilterX, Settings2 } from "lucide-react";
import { columnDictionary } from "@/typing/dictionary";
import { ColumnEnum } from "@/typing/enum";
import { Separator } from "../ui/separator";

interface ViewOptionsProps<TData> {
  table: Table<TData>;
}

export default function ViewOptions<TData>({ table }: ViewOptionsProps<TData>) {
  console.log();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2.5  ml-auto  h-8 lg:flex"
        >
          <Filter size={15} className="mr-2" />
          አጣራ
          <Separator orientation="vertical" className="h-8" />
          <FilterX size={15} className="mr-2 " />
        </Button>
      </DropdownMenuTrigger>
      {/* <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Settings2 size={15} className="mr-2" />
          ደብዳቤዎችን መድብ
        </Button>
      </DropdownMenuTrigger> */}

      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Settings2 size={15} className="mr-2" />
          አምዶች መቀየሪያ
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>ዓምዶችን ቀያይር</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {columnDictionary[column.id as ColumnEnum]}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
