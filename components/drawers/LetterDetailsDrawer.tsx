"use client";

import { Badge } from "@/components/ui/badge";
import type { LetterDetailType } from "@/types/letter_module";
import { letterTypeTranslations } from "@/types/letter_module";
import {
	FileDigit,
	Languages,
	Mail,
	MessageSquareText,
	Paperclip,
} from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";

interface ILetterMetaData {
	label: string;
	value: string;
	icon: React.JSX.Element;
}

export default function LetterDetailsDrawer({
	letter,
}: {
	letter: LetterDetailType;
}) {
	const [letterMeta, setLetterMeta] = useState<ILetterMetaData[]>([]);

	useEffect(() => {
		const LetterMetaData: ILetterMetaData[] = [
			{
				label: "የደብዳቤ አይነት",
				value: letterTypeTranslations[letter.letter_type.toUpperCase()],
				icon: <Mail size={20} className="text-gray-600" />,
			},
			{
				label: "የመዝገብ ቁጥር",
				value:
					letter.language === "English"
						? letter.reference_number
						: letter.reference_number_am,
				icon: <FileDigit size={20} className="text-gray-600" />,
			},
			{
				label: "ቋንቋ",
				value: letter.language,
				icon: <Languages size={20} className="text-gray-600" />,
			},
		];
		setLetterMeta(LetterMetaData);
	}, [letter]);

	return (
		<section className="flex flex-col gap-10">
			<div className="flex flex-col gap-2">
				{letterMeta.map(({ label, value, icon }) => (
					<Fragment key={label}>
						<div className="flex items-center gap-2">
							{icon}
							<p className="text-gray-600">{label}</p>
						</div>
						<Badge className="mb-2 h-10 rounded-sm bg-gray-200 text-base font-normal text-gray-900">
							{value}
						</Badge>
					</Fragment>
				))}
				<div className="flex items-center gap-2">
					<Paperclip size={20} className="text-gray-600" />
					<p className="text-gray-600">የተያያዙ ፋይሎች</p>
				</div>
			</div>
			<div className="flex flex-col gap-5">
				<a className="flex w-fit items-center gap-2" href="#comment_section">
					<MessageSquareText size={20} className="text-gray-600" />
					<p className="text-gray-600">{letter.comments?.length || 0}</p>
				</a>
			</div>
		</section>
	);
}
