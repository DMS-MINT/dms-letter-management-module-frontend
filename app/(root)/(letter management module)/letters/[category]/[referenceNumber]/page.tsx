"use client";

import { getLetterDetails } from "@/actions/letter_module/crudActions";
import { LetterDetailsDrawer } from "@/components/drawers";
import { ActivityFeed } from "@/components/features";
import { Drawer, Subheader } from "@/components/layouts";
import { DetailControlPanel } from "@/components/panels";
import { LetterSkeleton } from "@/components/skeletons";
import { EditableLetter } from "@/components/templates";
import type { LetterStoreType } from "@/stores";
import { useLetterStore, useParticipantStore } from "@/stores";
import type { LetterDetailResponseType } from "@/types/letter_module";
import { LanguageEnum } from "@/types/shared";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function LetterDetail() {
	const setLetter = useLetterStore((state) => state.setLetter);
	const setParticipants = useParticipantStore((state) => state.setParticipants);
	const { referenceNumber } = useParams();
	const { data, isSuccess } = useQuery({
		queryKey: ["getLetterDetails", referenceNumber],
		queryFn: async () => {
			try {
				toast.dismiss();
				toast.loading("የደብዳቤዉን ዝርዝር መረጃ በማምጣት ላይ፣ እባክዎ ይጠብቁ...");
				const response = await getLetterDetails(referenceNumber as string);

				toast.dismiss();
				if (!response.ok) throw response;

				const data = response.message as LetterDetailResponseType;

				const message: LetterStoreType = {
					subject: data.letter.subject || "",
					content: data.letter.content || "",
					letter_type: data.letter.letter_type,
					language: LanguageEnum[data.letter.language],
				};

				setLetter(message);
				setParticipants(data.letter.participants);

				return response.message as LetterDetailResponseType;
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		enabled: !!referenceNumber,
	});

	return isSuccess && data ? (
		<section className="flex h-full flex-col">
			<Subheader>
				<DetailControlPanel data={data} />
			</Subheader>
			<section className="mt-2 flex flex-1 gap-6 px-5">
				<Drawer>
					<LetterDetailsDrawer letter={data.letter} />
				</Drawer>
				<section className="flex-1 pb-5">
					<section className="mb-5 flex flex-1 flex-col items-center bg-gray-100 py-5">
						<EditableLetter letter={data.letter} />
					</section>
					<ActivityFeed letter={data.letter} />
				</section>
			</section>
		</section>
	) : (
		<LetterSkeleton />
	);
}
