"use client";

import { Subheader, Drawer } from "@/components/layouts";
import { ActivityFeed } from "@/components/shared";
import { OutgoingLetterTemplate } from "@/components/letter_module/templates";
import { get_letter_details } from "@/lib/features/letter/actions";
import { LetterDetailResponseType } from "@/types/letter_module";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
	ActionButtons,
	LetterDetailsDrawer,
	LetterSkeleton,
} from "@/components/letter_module";

export default function LetterDetail() {
	const { referenceNumber } = useParams();

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ["fetchLetterDetails", referenceNumber],
		queryFn: async () => {
			try {
				toast.dismiss();
				toast.loading("የደብዳቤ ዝርዝር መረጃ በማምጣት ላይ፣ እባክዎ ይጠብቁ...");
				const data: LetterDetailResponseType = await get_letter_details(
					referenceNumber as string
				);
				toast.dismiss();
				return data;
			} catch (error: any) {
				toast.dismiss();
				toast.error(error);
			}
		},
		enabled: !!referenceNumber,
	});

	return isSuccess && data ? (
		<main className="flex flex-col h-full">
			<Subheader>
				<section className="flex items-center justify-between w-full">
					{data.letter.subject ? (
						<h1 className="page-title limited-chars ">{data.letter.subject}</h1>
					) : (
						<h1 className="page-title !text-gray-400">ርዕሰ ጉዳይ የሌለው ደብዳቤ</h1>
					)}
					<div className="flex items-center ml-auto gap-2">
						<ActionButtons data={data} />
					</div>
				</section>
			</Subheader>
			<section className="flex px-5 gap-6 mt-2 flex-1">
				<Drawer>
					<LetterDetailsDrawer letter={data.letter} />
				</Drawer>
				<section className="flex-1 pb-5">
					<section className="mb-5 flex-1 flex flex-col bg-gray-100">
						{true ? <OutgoingLetterTemplate /> : null}
					</section>
					<ActivityFeed letter={data.letter} />
				</section>
			</section>
		</main>
	) : (
		<LetterSkeleton />
	);
}
