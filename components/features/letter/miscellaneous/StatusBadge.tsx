import { letterStatusLookup } from "@/typing/dictionary";
import {
  BookDashed,
  Check,
  FolderClosed,
  Hourglass,
  LucideIcon,
  Trash,
  X,
} from "lucide-react";
import clsx from "clsx";

const statusIconMapping: Record<string, LucideIcon> = {
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
        "rounded-md w-fit flex items-center justify-between ml-2 px-2 py-1",
        {
          "bg-blue-600 text-blue-200 gap-1": current_state === "Draft",
          "bg-yellow-600 text-yellow-200 gap-1": current_state === "Submitted",
          "bg-green-600 text-green-200 gap-1": current_state === "Published",
          "bg-gray-600 text-gray-200 gap-1": current_state === "Closed",
          "bg-red-600 text-red-200 gap-1": current_state === "Rejected",
          "bg-red-500 text-red-200 gap-1": current_state === "Trashed",
        }
      )}
    >
      <StatusIcon size={18} />
      <p>{letterStatusLookup[current_state]}</p>
    </div>
  );
}
