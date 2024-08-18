import { StatusBadge } from "@/components/pills";
import generateUserPermissions from "@/lib/utils/generateUserPermissions";
import type { LetterDetailResponseType } from "@/types/letter_module";
import { memo } from "react";
import { ActionButtons, PrintPreviewButton } from "../buttons";

function DetailControlPanel({ data }: { data: LetterDetailResponseType }) {
	return (
		<section className="flex w-full items-center justify-between">
			<h1 className="page-title">{data.letter.reference_number}</h1>
			<StatusBadge current_state={data.letter.current_state} />
			<div className="ml-auto flex items-center gap-2">
				<PrintPreviewButton
					pdf_version={data.letter.pdf_version}
					current_state={data.letter.current_state}
				/>
				<ActionButtons
					owner={data.letter.owner}
					permissions={generateUserPermissions(data.permissions)}
					current_state={data.letter.current_state}
				/>
			</div>
		</section>
	);
}

export default memo(DetailControlPanel);
