"use client";

import { getLetterDetails } from "@/actions/letter_module/crudActions";
import { LetterDetailsDrawer } from "@/components/drawers";
import { ActivityFeed } from "@/components/features";
import { Drawer, Subheader } from "@/components/layouts";
import { DetailControlPanel } from "@/components/panels";
import { LetterSkeleton } from "@/components/skeletons";
import { EditableLetter } from "@/components/templates";
import { useWebsocket } from "@/hooks";
import {
	useLetterRevisionStore,
	type LetterContentStoreType,
} from "@/lib/stores";
import generateUserPermissions from "@/lib/utils/generateUserPermissions";
import type { LetterDetailResponseType } from "@/types/letter_module";
import { LanguageEnum } from "@/types/shared";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function LetterDetail({
	params: { referenceNumber },
}: {
	params: { referenceNumber: string };
}) {
	const { initializeContent, initializeParticipants } = useLetterRevisionStore(
		(state) => ({
			initializeContent: state.initializeContent,
			initializeParticipants: state.initializeParticipants,
		})
	);
	const queryClient = useQueryClient();
	const { data, isSuccess } = useQuery({
		queryKey: ["getLetterDetails", referenceNumber],
		queryFn: async () => {
			try {
				toast.dismiss();
				toast.loading("የደብዳቤዉን ዝርዝር መረጃ በማምጣት ላይ፣ እባክዎ ይጠብቁ...");
				const response = await getLetterDetails(referenceNumber);

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
				};

				initializeContent(content);
				initializeParticipants(data.letter.participants);

				return response.message as LetterDetailResponseType;
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		enabled: !!referenceNumber,
	});

	useWebsocket<LetterDetailResponseType>({
		url: `ws://localhost:8000/ws/letters/${referenceNumber}/`,
		onMessage: (message) => {
			queryClient.setQueryData<LetterDetailResponseType>(
				["getLetterDetails", referenceNumber],
				(oldData) => {
					return { ...oldData, ...message };
				}
			);
		},
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
						<EditableLetter
							editable={generateUserPermissions(data.permissions).can_update_letter}
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
