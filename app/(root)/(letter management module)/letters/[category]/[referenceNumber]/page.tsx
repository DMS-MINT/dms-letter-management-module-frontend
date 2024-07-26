"use client";

import { Subheader, Drawer } from "@/components/layouts";
import { ActivityFeed } from "@/components/shared";
import { OutgoingLetterTemplate } from "@/components/letter_module/templates";
import { getLetterDetails } from "@/actions/letter_module/crudActions";
import { LetterDetailResponseType } from "@/types/letter_module";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
	DetailControlPanel,
	LetterDetailsDrawer,
	LetterSkeleton,
} from "@/components/letter_module";

export default function LetterDetail() {
	const { referenceNumber } = useParams();

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ["getLetterDetails", referenceNumber],
		queryFn: async () => {
			try {
				toast.dismiss();
				toast.loading("የደብዳቤዉን ዝርዝር መረጃ በማምጣት ላይ፣ እባክዎ ይጠብቁ...");
				const response = await getLetterDetails(referenceNumber as string);

				toast.dismiss();
				if (!response.ok) throw response;

				return response.message as LetterDetailResponseType;
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		enabled: !!referenceNumber,
	});

	return isSuccess && data ? (
		<main className="flex flex-col h-full">
			<Subheader>
				<DetailControlPanel data={data} />
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
