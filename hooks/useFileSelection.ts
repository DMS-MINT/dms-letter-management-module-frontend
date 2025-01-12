import type { IFileItem } from "@/types/shared";
import { useState } from "react";

export const useFileSelection = () => {
	const [selectedFiles, setSelectedFiles] = useState<IFileItem[]>([]);

	const toggleFileSelection = (file: IFileItem) => {
		setSelectedFiles((prev) =>
			prev.some((f) => f.id === file.id)
				? prev.filter((f) => f.id !== file.id)
				: [...prev, file]
		);
	};

	const isFileSelected = (file: IFileItem) => {
		return selectedFiles.some((f) => f.id === file.id);
	};

	return { selectedFiles, toggleFileSelection, isFileSelected };
};
