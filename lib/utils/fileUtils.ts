import type { ILedger } from "@/types/ledger";
import type { IFileItem, SortOption } from "@/types/shared";

export const sortFiles = (
	files: IFileItem[],
	sortBy: SortOption
): IFileItem[] => {
	return [...files].sort((a, b) => {
		switch (sortBy) {
			case "name":
				return a.name.localeCompare(b.name);
			case "size":
				return a.size - b.size;
			case "modified":
				return b.modified.getTime() - a.modified.getTime();
			default:
				return 0;
		}
	});
};

export const formatFileSize = (bytes: number): string => {
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	if (bytes === 0) return "0 Byte";
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
	return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
};
export const sortLedgerFiles = (
	files: ILedger[] = [],
	sortBy: SortOption
): ILedger[] => {
	// Ensure files is always an array
	if (!Array.isArray(files)) {
		return [];
	}

	return [...files].sort((a, b) => {
		switch (sortBy) {
			case "name":
				// Ensure ledger_subject is a string; fallback to an empty string if undefined
				return (a.ledger_subject || "").localeCompare(b.ledger_subject || "");
			case "size":
				// Convert document_date to a string for comparison; fallback to an empty string
				return (a.document_date || "").localeCompare(b.document_date || "");
			case "modified":
				// Convert created_at to a string for comparison; fallback to an empty string
				return (a.created_at || "").localeCompare(b.created_at || "");
			default:
				// Default case ensures a valid number is returned
				return 0;
		}
	});
};

export const generateThumbnailUrl = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target?.result) {
				resolve(e.target.result as string);
			} else {
				reject(new Error("Failed to generate thumbnail"));
			}
		};
		reader.onerror = () => reject(new Error("Failed to read file"));
		reader.readAsDataURL(file);
	});
};

export const isImageFile = (file: File): boolean => {
	return file.type.startsWith("image/");
};

export const isPDFFile = (file: File): boolean => {
	return file.type === "application/pdf";
};
