"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { LetterTableColumns } from "@/types/letter_module";
import { columnTranslation } from "@/types/letter_module";
import { Settings2 } from "lucide-react";

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
					className="ml-auto flex  h-8 gap-2.5 lg:flex"
				>
					<Filter size={15} className="mr-2" />
					አጣራ
					<Separator orientation="vertical" className="h-8" />
					<FilterX size={15} className="mr-2 " />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
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
