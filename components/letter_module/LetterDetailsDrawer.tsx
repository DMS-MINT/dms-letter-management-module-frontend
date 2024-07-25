"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquareText, FileDigit, X, Paperclip } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import {
	LetterDetailType,
	letterTypeTranslations,
} from "@/types/letter_module";

interface ILetterMetaData {
	label: string;
	value: string;
	icon: JSX.Element;
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
				value: letter.reference_number,
				icon: <FileDigit size={20} className="text-gray-600" />,
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
						<Badge className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal mb-2">
							{value}
						</Badge>
					</Fragment>
				))}
				<div className="flex items-center gap-2">
					<Paperclip size={20} className="text-gray-600" />
					<p className="text-gray-600">የተያያዙ ፋይሎች</p>
				</div>
				{letter.attachments.map((attachment, index) => (
					<Badge
						key={attachment.id}
						className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal"
					>
						<Link
							key={uuidv4()}
							href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${attachment.file}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{`አባሪ ${index + 1}`}
						</Link>
						<Button
							size="icon"
							variant="ghost"
							type="button"
							className="p-0 hover:bg-transparent ml-auto"
						>
							{/* <X size={20} /> */}
						</Button>
					</Badge>
				))}
			</div>
			<div className="flex flex-col gap-5">
				<a className="flex items-center gap-2 w-fit" href="#comment_section">
					<MessageSquareText size={20} className="text-gray-600" />
					<p className="text-gray-600">{letter.comments?.length || 0}</p>
				</a>
			</div>
		</section>
	);
}
