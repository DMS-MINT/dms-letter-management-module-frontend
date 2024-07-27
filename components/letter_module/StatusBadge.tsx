import { letterStatusTranslations } from "@/types/letter_module";
import clsx from "clsx";
import {
	BookDashed,
	Check,
	FolderClosed,
	Hourglass,
	Trash,
	X,
} from "lucide-react";

const statusIconMapping: Record<string, any> = {
	Draft: BookDashed,
	Submitted: Hourglass,
	Published: Check,
	Closed: FolderClosed,
	Rejected: X,
	Trashed: Trash,
};

export default function StatusBadge({
	current_state,
}: {
	current_state: string;
}) {
	const StatusIcon = statusIconMapping[current_state] || BookDashed;

	return (
		<div
			className={clsx(
				"ml-2 flex w-fit items-center justify-between gap-1 rounded-md px-2 py-1",
				{
					" bg-blue-600 text-blue-200": current_state === "Draft",
					" bg-yellow-600 text-yellow-200": current_state === "Submitted",
					" bg-green-600 text-green-200": current_state === "Published",
					" bg-gray-600 text-gray-200": current_state === "Closed",
					" bg-red-600 text-red-200": current_state === "Rejected",
					" bg-red-500 text-red-200": current_state === "Trashed",
				}
			)}
		>
			<StatusIcon size={18} />
			<p>{letterStatusTranslations[current_state.toUpperCase()]}</p>
		</div>
	);
}
