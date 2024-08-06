"use client";

import { getLetters } from "@/actions/letter_module/crudActions";
import { LetterNavigationDrawer } from "@/components/drawers";
import { Drawer, Subheader } from "@/components/layouts";
import { TableControlPanel } from "@/components/panels";
import { LetterSkeleton } from "@/components/skeletons";
import { DataTable } from "@/components/tables";
import {
	draftTableColumns,
	inboxTableColumns,
	outboxTableColumns,
	pendingTableColumns,
	publishedTableColumns,
	trashTableColumns,
} from "@/components/tables/config";
import type {
	LetterColumnDefType,
	LetterDetailType,
} from "@/types/letter_module";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
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
	const param = params.category as string;
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

	//*Sorting for letter

	const sortedLetters = useMemo(() => {
		if (!letters) return [];

		const compareFn =
			params.category === "published"
				? compareLettersByUpdatedAt
				: compareLettersByCreatedAt;
		return letters.sort(compareFn);
	}, [letters, params.category]);

	function compareLettersByCreatedAt(
		a: LetterDetailType,
		b: LetterDetailType
	): number {
		const aTimestamp = new Date(a.created_at).getTime();
		const bTimestamp = new Date(b.created_at).getTime();
		return bTimestamp - aTimestamp;
	}
	function compareLettersByUpdatedAt(
		a: LetterDetailType,
		b: LetterDetailType
	): number {
		const aTimestamp = new Date(a.updated_at).getTime();
		const bTimestamp = new Date(b.updated_at).getTime();
		return bTimestamp - aTimestamp;
	}

	return isSuccess && letters ? (
		<>
			<Subheader>
				<TableControlPanel />
			</Subheader>
			<section className="mt-2 flex flex-1 gap-3 px-5 pb-3">
				<Drawer>
					<LetterNavigationDrawer />
				</Drawer>
				<section className="card h-fit min-w-0 flex-1">
					{/* <DataTable columns={columns} data={letters} /> */}
					<DataTable columns={columns} data={sortedLetters} param={param} />
				</section>
			</section>
		</>
	) : (
		<LetterSkeleton />
	);
}
