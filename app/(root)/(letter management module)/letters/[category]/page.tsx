"use client";

import { Subheader, Drawer, Main } from "@/components/layouts";
import { DataTable } from "@/components/shared/tableComponents";
import { useParams } from "next/navigation";
import {
	pendingTableColumns,
	draftTableColumns,
	inboxTableColumns,
	outboxTableColumns,
	publishedTableColumns,
	trashTableColumns,
} from "@/components/features/letter/config";
import { useEffect, useState } from "react";
import { ILetterListInputSerializer } from "@/typing/interface";
import { ColumnDef } from "@tanstack/react-table";
import {
	LetterNavigationDrawer,
	TableControlPanel,
} from "@/components/features/letter";
import { useMutation } from "@tanstack/react-query";
import { getLetters } from "@/lib/features/letter/actions";
import { toast } from "sonner";

export default function Table() {
	const params = useParams();
	const [columns, setColumns] = useState<
		ColumnDef<ILetterListInputSerializer>[]
	>([]);
	const { mutate, data } = useMutation({
		mutationKey: ["Get Letters"],
		mutationFn: (category: string) => getLetters(category),
		onMutate: () => {
			toast.dismiss();
			toast.loading("Fetching letters, Please wait...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			toast.success("Letters successfully retrieved!");
		},
		onError: (errorMessage: string) => {
			toast.dismiss();
			toast.success(errorMessage);
		},
	});

	useEffect(() => {
		switch (params.category) {
			case "inbox":
				setColumns(inboxTableColumns);
				mutate("inbox");
				break;
			case "outbox":
				setColumns(outboxTableColumns);
				mutate("outbox");
				break;
			case "draft":
				setColumns(draftTableColumns);
				mutate("draft");
				break;
			case "trash":
				setColumns(trashTableColumns);
				mutate("trash");
				break;
			case "pending":
				setColumns(pendingTableColumns);
				mutate("pending");
				break;
			case "published":
				setColumns(publishedTableColumns);
				mutate("published");
				break;
			default:
				break;
		}
	}, [params]);

	return (
		<>
			<Subheader>
				<TableControlPanel />
			</Subheader>
			<section className="flex flex-1 pb-3 px-5 gap-3 mt-2">
				<Drawer>
					<LetterNavigationDrawer />
				</Drawer>
				<Main>
					<DataTable columns={columns} data={data ? data : []} />
				</Main>
			</section>
		</>
	);
}
