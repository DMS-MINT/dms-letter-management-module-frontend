import { LetterDetailResponseType } from "@/types/letter_module";
import { ActionButtons, StatusBadge } from ".";

export default function DetailControlPanel({
	data,
}: {
	data: LetterDetailResponseType;
}) {
	return (
		<section className="flex items-center justify-between w-full">
			<h1 className="page-title limited-chars ">
				{data.letter.subject ? data.letter.subject : "ርዕሰ ጉዳይ የሌለው ደብዳቤ"}
			</h1>
			<StatusBadge current_state={data.letter.current_state} />
			<div className="flex items-center ml-auto gap-2">
				{/* <PrintPreviewButton /> */}
				<ActionButtons data={data} />
			</div>
		</section>
	);
}
