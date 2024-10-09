"use client";

import { LetterComposeDrawer } from "@/components/drawers";
import { Drawer, Subheader } from "@/components/layouts";
import { ComposeControlPanel } from "@/components/panels";
import {
	IncomingLetterTemplate,
	InternalLetterTemplate,
	OutgoingLetterTemplate,
} from "@/components/templates";
import type { TemplateProps } from "@/components/templates/types";
import useBlockEditor from "@/hooks/useBlockEditor";
import { useDraftLetterStore } from "@/lib/stores";
import { useMemo } from "react";

export default function Compose() {
	const {
		subject,
		body,
		language,
		letter_type,
		participants,
		updateLetterField,
		addParticipant,
		removeParticipant,
	} = useDraftLetterStore();

	const { editor } = useBlockEditor({ editable: true, body, updateLetterField });

	const TemplateComponent = useMemo(() => {
		const templateMap: Record<string, React.FC<TemplateProps>> = {
			internal: InternalLetterTemplate,
			outgoing: OutgoingLetterTemplate,
			incoming: IncomingLetterTemplate,
		};

		return templateMap[letter_type] || null;
	}, [letter_type]);

	if (!editor) return null;

	return (
		<>
			<Subheader>
				<ComposeControlPanel />
			</Subheader>
			<section className="flex h-fit gap-6 pl-8 pr-5">
				<Drawer>
					<LetterComposeDrawer />
				</Drawer>
				<main className="mb-0 flex flex-1 flex-col items-center bg-gray-100 py-5">
					<TemplateComponent
						publishable={false}
						editor={editor}
						language={language}
						subject={subject}
						reference_number=""
						published_at=""
						participants={participants}
						isLetterReadOnly={false}
						updateLetterField={updateLetterField}
						addParticipant={addParticipant}
						removeParticipant={removeParticipant}
					/>
				</main>
			</section>
		</>
	);
}
