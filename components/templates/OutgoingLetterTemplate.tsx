import { ParticipantSelector } from "@/components/forms";
import {
	OutgoingLetterFooter,
	OutgoingLetterHeader,
	RefNoAndDate,
} from "@/components/templates";
import { getDefaultValue } from "@/lib/utils/participantUtils";
import { RoleEnum } from "@/types/letter_module";
import { LanguageEnum } from "@/types/shared";
import { BlockEditor } from "../BlockEditor";
import { Label } from "../ui/label";
import Paper from "./Paper";
import type { TemplateProps } from "./types";
import { Textarea } from "../ui/textarea";

export default function OutgoingLetterTemplate({
	publishable,
	editor,
	language,
	subject,
	participants,
	published_at,
	isLetterReadOnly,
	reference_number,
	addParticipant,
	removeParticipant,
	updateLetterField,
}: TemplateProps) {
	return (
		<Paper>
			<OutgoingLetterHeader />
			<RefNoAndDate
				reference_number={reference_number}
				published_at={published_at}
				publishable={publishable}
			/>
			<ParticipantSelector
				language={language}
				prefix={language === LanguageEnum.English ? "To" : "ለ"}
				isDisabled={isLetterReadOnly}
				name={RoleEnum["PRIMARY RECIPIENT"]}
				placeholder="እባክዎ የደብዳቤውን ለማን እንደሚልኩ ይምረጡ"
				participantScope="external_staff"
				participants={participants}
				addParticipant={addParticipant}
				removeParticipant={removeParticipant}
				value={getDefaultValue(participants, RoleEnum["PRIMARY RECIPIENT"])}
			/>
			<div className="mb-2 flex w-full items-center justify-center gap-2 self-center">
				<Label>{language === LanguageEnum.English ? "Subject" : "ጉዳዩ"}:-</Label>
				<Textarea
					value={subject}
					disabled={isLetterReadOnly}
					className="h-auto min-h-10 min-w-20 flex-grow resize-none rounded-none border-none ring-offset-0 focus-visible:border-b focus-visible:ring-0  disabled:bg-transparent"
					onChange={(e) => updateLetterField("subject", e.target.value)}
					placeholder="የደብዳቤዎን ርዕሰ ጉዳይ እዚህ ያስገቡ..."
					rows={1}
				/>
			</div>
			<BlockEditor editor={editor} />
			<div className="mt-auto py-3 font-serif">
				<p>{language === LanguageEnum.English ? "BCC" : "እንዲያውቁት"}:-</p>
				<ul className="pl-5">
					<div className="flex flex-col gap-1 pt-1 font-serif ">
						<ParticipantSelector
							language={language}
							prefix={language === LanguageEnum.English ? "To" : "ለ"}
							isDisabled={isLetterReadOnly}
							name={RoleEnum["BLIND CARBON COPY RECIPIENT"]}
							placeholder="እባክዎ ስለ ደብዳቤው እንዲያውቁ የሚገባቸውን ሰዎች ይምረጡ"
							participantScope="all"
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
				<p>{language === LanguageEnum.English ? "CC" : "ግልባጭ"}:-</p>
				<ul className="pl-5">
					<div className="flex flex-col gap-1 pt-1 font-serif ">
						<ParticipantSelector
							language={language}
							prefix={language === LanguageEnum.English ? "To" : "ለ"}
							isDisabled={isLetterReadOnly}
							name={RoleEnum["CARBON COPY RECIPIENT"]}
							placeholder="እባክዎ የደብዳቤው ግልባጭ የሚላክላቸውን ሰዎች ይምረጡ"
							participantScope="all"
							participants={participants}
							addParticipant={addParticipant}
							removeParticipant={removeParticipant}
							value={getDefaultValue(participants, RoleEnum["CARBON COPY RECIPIENT"])}
						/>
					</div>
				</ul>
			</div>
			<OutgoingLetterFooter />
		</Paper>
	);
}
