import { ActionButtons } from "@/components/buttons";
import { StatusBadge } from "@/components/pills";
import type { LetterDetailResponseType } from "@/types/letter_module";
import { PrintPreviewButton } from "../buttons";

export default function DetailControlPanel({
	data,
}: {
	data: LetterDetailResponseType;
}) {
	return (
		<section className="flex w-full items-center justify-between">
			<h1 className="page-title limited-chars ">
				{data.letter.subject ? (
					data.letter.subject
				) : (
					<span className="text-gray-400">ርዕሰ ጉዳይ የሌለው ደብዳቤ</span>
				)}
			</h1>
			<StatusBadge current_state={data.letter.current_state} />
			<div className="ml-auto flex items-center gap-2">
				<PrintPreviewButton pdf_version={data.letter.pdf_version} />
				<ActionButtons data={data} />
			</div>
		</section>
	);
}
PrintPreviewButton;
