import { ParticipantSelector } from "@/components/forms";
import { getDefaultValue } from "@/lib/utils/participantUtils";
import { RoleEnum } from "@/types/letter_module";
import { BlockEditor } from "../BlockEditor";
import { Label } from "../ui/label";
import Paper from "./Paper";
import type { TemplateProps } from "./types";

export default function InternalLetterTemplate({
	editor,
	subject,
	participants,
	isLetterReadOnly,
	addParticipant,
	removeParticipant,
	updateLetterField,
}: TemplateProps) {
	return (
		<Paper>
			<ParticipantSelector
				prefix="ለ"
				isDisabled={isLetterReadOnly}
				name={RoleEnum["PRIMARY RECIPIENT"]}
				placeholder="እባክዎ የደብዳቤውን ለማን እንደሚልኩ ያስገቡ"
				participantScope="all"
				participants={participants}
				addParticipant={addParticipant}
				removeParticipant={removeParticipant}
				value={getDefaultValue(participants, RoleEnum["PRIMARY RECIPIENT"])}
			/>
			<div className="mb-2 flex w-full items-center justify-center gap-2 self-center">
				<Label>ጉዳዩ:-</Label>
				<input
					type="text"
					value={subject}
					disabled={isLetterReadOnly}
					className="min-w-20 flex-grow rounded-none focus:border-b focus:outline-0 disabled:bg-transparent"
					onChange={(e) => updateLetterField("subject", e.target.value)}
					placeholder="የደብዳቤዎን ርዕሰ ጉዳይ እዚህ ያስገቡ..."
				/>
			</div>
			<BlockEditor editor={editor} />
			<div className="mt-auto py-3 font-serif">
				<p>እንዲያውቁት:-</p>
				<ul className="pl-5">
					<div className="flex flex-col gap-1 pt-1 font-serif ">
						<ParticipantSelector
							prefix="ለ"
							isDisabled={isLetterReadOnly}
							name={RoleEnum["BLIND CARBON COPY RECIPIENT"]}
							placeholder="እባክዎ ስለ ደብዳቤው እንዲያውቁ የሚገባቸውን ሰዎች ይምረጡ"
							participantScope="internal_staff"
							participants={participants}
							addParticipant={addParticipant}
							removeParticipant={removeParticipant}
							value={getDefaultValue(
								participants,
								RoleEnum["BLIND CARBON COPY RECIPIENT"]
							)}
						/>
					</div>
				</ul>
			</div>
			<div className="py-3 font-serif">
				<p>ግልባጭ:-</p>
				<ul className="pl-5">
					<div className="flex flex-col gap-1 pt-1 font-serif ">
						<ParticipantSelector
							prefix="ለ"
							isDisabled={isLetterReadOnly}
							name={RoleEnum["CARBON COPY RECIPIENT"]}
							placeholder="እባክዎ የደብዳቤው ግልባጭ የሚላክላቸውን ሰዎች ይምረጡ"
							participantScope="internal_staff"
							participants={participants}
							addParticipant={addParticipant}
							removeParticipant={removeParticipant}
							value={getDefaultValue(participants, RoleEnum["CARBON COPY RECIPIENT"])}
						/>
					</div>
				</ul>
			</div>
		</Paper>
	);
}
