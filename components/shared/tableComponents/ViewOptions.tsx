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
import { LetterTableColumns, columnTranslation } from "@/types/letter_module";

interface ViewOptionsProps<TData> {
	table: Table<TData>;
}

export default function ViewOptions<TData>({ table }: ViewOptionsProps<TData>) {
	return (
		<DropdownMenu>
			{/* <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2.5  ml-auto h-8 lg:flex"
        >
          <Filter size={15} className="mr-2" />
          አጣራ
          <Separator orientation="vertical" className="h-8" />
          <FilterX size={15} className="mr-2 " />
        </Button>
      </DropdownMenuTrigger> */}
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
				<Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
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
								{columnTranslation[column.id as LetterTableColumns]}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
