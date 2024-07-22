"use client";

import { Subheader, Drawer, Main } from "@/components/layouts";
import { DataTable } from "@/components/shared/tableComponents";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { getLetters } from "@/lib/features/letter/actions";
import { toast } from "sonner";
import { LetterType } from "@/types/letter_module";
import {
	draftTableColumns,
	inboxTableColumns,
	outboxTableColumns,
	pendingTableColumns,
	publishedTableColumns,
	trashTableColumns,
} from "@/components/letter_module/config";
import { useParams } from "next/navigation";
import {
	LetterSkeleton,
	LetterNavigationDrawer,
	TableControlPanel,
} from "@/components/letter_module";

const getColumnConfig = (category: string): ColumnDef<LetterType>[] => {
	switch (category) {
		case "inbox":
			return inboxTableColumns;
		case "outbox":
			return outboxTableColumns;
		case "draft":
			return draftTableColumns;
		case "trash":
			return trashTableColumns;
		case "pending":
			return pendingTableColumns;
		case "published":
			return publishedTableColumns;
		default:
			return [];
	}
};

export default function Table() {
	const params = useParams();
	const [columns, setColumns] = useState<ColumnDef<LetterType>[]>([]);
	const { isSuccess, data: letters } = useQuery({
		queryKey: ["getLetters", params.category],
		queryFn: async () => {
			try {
				toast.dismiss();
				toast.loading("ደብዳቤዎችን በማምጣት ላይ፣ እባክዎ ይጠብቁ...");
				const category = params.category as string;
				const data = await getLetters(category);
				const columnConfig = getColumnConfig(category);
				setColumns(columnConfig);
				toast.dismiss();
				return data.letters;
			} catch (error: any) {
				toast.dismiss();
				toast.error(error.message);
			}
		},
	});

	return isSuccess ? (
		<>
			<Subheader>
				<TableControlPanel />
			</Subheader>
			<section className="flex flex-1 pb-3 px-5 gap-3 mt-2">
				<Drawer>
					<LetterNavigationDrawer />
				</Drawer>
				<Main>
					<DataTable columns={columns} data={letters} />
				</Main>
			</section>
		</>
	) : (
		<LetterSkeleton />
	);
}
