import { ParticipantSelector } from "@/components/forms";
import { getDefaultValue } from "@/lib/utils/participantUtils";
import { RoleEnum } from "@/types/letter_module";
import { LanguageEnum } from "@/types/shared";
import { Label } from "@radix-ui/react-label";
import Paper from "./Paper";
import type { TemplateProps } from "./types";

export default function IncomingLetterTemplate({
	language,
	subject,
	participants,
	isLetterReadOnly,
	addParticipant,
	removeParticipant,
	updateLetterField,
}: TemplateProps) {
	return (
		<Paper>
			<div className="mb-7 flex w-full items-center justify-center gap-2 self-center">
				<Label>{language === LanguageEnum.English ? "Subject" : "ጉዳዩ"}:-</Label>
				<input
					type="text"
					value={subject}
					disabled={isLetterReadOnly}
					className="min-w-20 flex-grow rounded-none focus:border-b focus:outline-0 disabled:bg-transparent"
					onChange={(e) => updateLetterField("subject", e.target.value)}
					placeholder="የደብዳቤዎን ርዕሰ ጉዳይ እዚህ ያስገቡ..."
				/>
			</div>
			<ParticipantSelector
				language={language}
				prefix={language === LanguageEnum.English ? "From" : "ከ"}
				isDisabled={isLetterReadOnly}
				name={RoleEnum["AUTHOR"]}
				placeholder="እባክዎን ደብዳቤው ከማን እንደተላከ ያስገቡ"
				participantScope="external_staff"
				participants={participants}
				addParticipant={addParticipant}
				removeParticipant={removeParticipant}
				value={getDefaultValue(participants, RoleEnum["AUTHOR"])}
			/>
			<ParticipantSelector
				language={language}
				prefix={language === LanguageEnum.English ? "To" : "ለ"}
				isDisabled={isLetterReadOnly}
				name={RoleEnum["PRIMARY RECIPIENT"]}
				placeholder="እባክዎን ደብዳቤው ለማን እንደተላከ ያስገቡ"
				participantScope="all"
				participants={participants}
				addParticipant={addParticipant}
				removeParticipant={removeParticipant}
				value={getDefaultValue(participants, RoleEnum["PRIMARY RECIPIENT"])}
			/>
			<div className="mt-auto py-3 font-serif">
				<p>{language === LanguageEnum.English ? "BCC" : "እንዲያውቁት"}:-</p>
				<ul className="pl-5">
					<div className="flex flex-col gap-1 pt-1 font-serif ">
						<ParticipantSelector
							language={language}
							prefix={language === LanguageEnum.English ? "To" : "ለ"}
							isDisabled={isLetterReadOnly}
							name={RoleEnum["BLIND CARBON COPY RECIPIENT"]}
							placeholder="እባክዎን ስለ ደብዳቤው እንዲያውቁ የሚገባቸውን ሰዎች ይምረጡ"
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
							placeholder="እባክዎን የደብዳቤው ግልባጭ የሚላክላቸውን ሰዎች ይምረጡ"
							participantScope="all"
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
