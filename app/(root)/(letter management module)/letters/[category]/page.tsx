"use client";

import { getLetters } from "@/actions/letter_module/crudActions";
import { Drawer, Main, Subheader } from "@/components/layouts";
import {
	LetterNavigationDrawer,
	LetterSkeleton,
	TableControlPanel,
} from "@/components/letter_module";
import {
	draftTableColumns,
	inboxTableColumns,
	outboxTableColumns,
	pendingTableColumns,
	publishedTableColumns,
	trashTableColumns,
} from "@/components/letter_module/config";
import { DataTable } from "@/components/shared/tableComponents";
import type { LetterColumnDefType } from "@/types/letter_module";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const getColumnConfig = (category: string): LetterColumnDefType => {
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
	const [columns, setColumns] = useState<LetterColumnDefType>([]);

	const { isSuccess, data: letters } = useQuery({
		queryKey: ["getLetters", params.category],
		queryFn: async () => {
			try {
				toast.dismiss();
				toast.loading("ደብዳቤዎችን በማምጣት ላይ፣ እባክዎ ይጠብቁ...");

				const category = params.category as string;
				const response = await getLetters(category);

				const columnConfig = getColumnConfig(category);
				setColumns(columnConfig);

				toast.dismiss();

				if (!response.ok) throw response;

				console.log(response.message);

				return response.message.letters;
			} catch (error: any) {
				toast.dismiss();
				toast.error(error.message);
			}
		},
	});

	return isSuccess && letters ? (
		<>
			<Subheader>
				<TableControlPanel />
			</Subheader>
			<section className="mt-2 flex flex-1 gap-3 px-5 pb-3">
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
