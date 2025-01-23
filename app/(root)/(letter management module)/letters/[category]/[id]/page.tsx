"use client";

import { getLetterDetails } from "@/actions/letter_module/crudActions";
import { LetterDetailsDrawer } from "@/components/drawers";
import { ActivityFeed } from "@/components/features";
import { Drawer, Subheader } from "@/components/layouts";
import { DetailControlPanel } from "@/components/panels";
import { LetterSkeleton } from "@/components/skeletons";
import { EditableLetter } from "@/components/templates";
import {
	useLetterRevisionStore,
	type LetterContentStoreType,
} from "@/lib/stores";
import generateUserPermissions from "@/lib/utils/generateUserPermissions";
import type { LetterDetailResponseType } from "@/types/letter_module";
import { LanguageEnum } from "@/types/shared";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function LetterDetail({
	params: { id },
}: {
	params: { id: string };
}) {
	const { initializeContent, initializeParticipants } = useLetterRevisionStore(
		(state) => ({
			initializeContent: state.initializeContent,
			initializeParticipants: state.initializeParticipants,
		})
	);

	const { data, isSuccess } = useQuery({
		queryKey: ["getLetterDetails", id],
		queryFn: async () => {
			try {
				toast.dismiss();
				toast.loading("የደብዳቤዉን ዝርዝር መረጃ በማምጣት ላይ፣ እባክዎ ይጠብቁ...");
				const response = await getLetterDetails(id);

				toast.dismiss();
				if (!response.ok) throw response;

				const data = response.message as LetterDetailResponseType;
				const content: LetterContentStoreType = {
					subject: data.letter.subject || "",
					body: data.letter.body || "",
					letter_type: data.letter.letter_type,
					language: LanguageEnum[data.letter.language],
					reference_number: data.letter.reference_number,
					published_at: data.letter.published_at,
					id: data.letter.id,
					current_state: data.letter.current_state,
					department:
						data.letter.letter_type === "outgoing"
							? data.letter.language === "English"
								? "MINT"
								: "ኢቴሚ "
							: data.letter.language === "English"
								? data.letter.owner.user_profile.department.abbreviation_en
								: data.letter.owner.user_profile.department.abbreviation_am,
					year: data.letter.language === "English" ? "2024" : "2017",
				};

				initializeContent(content);
				initializeParticipants(data.letter.participants);

				return response.message as LetterDetailResponseType;
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		enabled: !!id,
		staleTime: Infinity,
	});

	return isSuccess && data ? (
		<section className="flex h-full flex-col">
			<Subheader>
				<DetailControlPanel data={data} />
			</Subheader>
			<section className="mt-2 flex flex-1 gap-6 px-5">
				<Drawer>
					<LetterDetailsDrawer
						letter={data.letter}
						editable={generateUserPermissions(data.permissions).can_update_letter}
					/>
				</Drawer>
				<section className="flex-1 pb-5">
					<section className="mb-5 flex flex-1 flex-col items-center bg-gray-100 py-5">
						<EditableLetter
							editable={generateUserPermissions(data.permissions).can_update_letter}
							publishable={
								generateUserPermissions(data.permissions).can_publish_letter
							}
						/>
					</section>
					<ActivityFeed letter={data.letter} />
				</section>
			</section>
		</section>
	) : (
		<LetterSkeleton />
	);
}
