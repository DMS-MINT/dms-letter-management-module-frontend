"use client";

import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useLetterStore } from "@/stores";
import { LanguageEnum } from "@/types/shared";
import { Languages, Mail, Paperclip } from "lucide-react";

export default function LetterComposeDrawer() {
	const { updateLetterField, letter_type, language } = useLetterStore(
		(state) => ({
			letter_type: state.letter_type,
			language: state.language,
			updateLetterField: state.updateLetterField,
		})
	);

	const handleLetterTypeChange = (type: string): void => {
		updateLetterField("letter_type", type);
	};

	const handleLanguageChange = (type: LanguageEnum): void => {
		updateLetterField("language", type);
	};

	return (
		<section className="flex flex-col gap-10">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<Mail size={20} className="text-gray-600" />
					<p className="text-gray-600">የደብዳቤ ዓይነት</p>
				</div>
				<Select value={letter_type} onValueChange={handleLetterTypeChange}>
					<SelectTrigger>
						<SelectValue placeholder="የደብዳቤ ዓይነት ይምረጡ" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="internal" className="pr-2">
								የውስጥ ደብዳቤ
							</SelectItem>
							<SelectItem value="outgoing" className="pr-2">
								ወደ ውጪ የሚላክ
							</SelectItem>
							<SelectItem value="incoming" className="pr-2">
								ከውጭ የተላከ
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<div className="flex items-center gap-2">
					<Languages size={20} className="text-gray-600" />
					<p className="text-gray-600">ቋንቋ ይምረጡ</p>
				</div>
				<Select value={language} onValueChange={handleLanguageChange}>
					<SelectTrigger>
						<SelectValue placeholder="ቋንቋ ይምረጡ" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{Object.entries(LanguageEnum).map(([key, value]) => (
								<SelectItem key={key} value={value} className="pr-2">
									{key}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<div className="flex items-center gap-2">
					<Paperclip size={20} className="text-gray-600" />
					<p className="text-gray-600">የተያያዙ ፋይሎች</p>
				</div>
				<Badge className="mb-2 h-10 rounded-sm bg-gray-200 text-base font-normal text-gray-900"></Badge>
			</div>
		</section>
	);
}
