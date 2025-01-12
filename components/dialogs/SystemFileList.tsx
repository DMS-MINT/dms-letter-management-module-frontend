import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatFileSize } from "@/lib/utils/fileUtils";
import type {
	IFileItem,
	SortOption,
	ViewOption,
} from "@/types/shared/AttachmentType";
import React from "react";

interface SystemFileListProps {
	files: IFileItem[];
	sortBy: SortOption;
	view: ViewOption;
	onFileSelect: (file: IFileItem) => void;
	isSelected: (file: IFileItem) => boolean;
}

export const SystemFileList: React.FC<SystemFileListProps> = ({
	files,
	sortBy,
	view,
	onFileSelect,
	isSelected,
}) => {
	if (view === "list") {
		return (
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]"></TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Size</TableHead>
						<TableHead>Modified</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{files.map((file) => (
						<TableRow key={file.id} onClick={() => onFileSelect(file)}>
							<TableCell>
								<Checkbox checked={isSelected(file)} />
							</TableCell>
							<TableCell>{file.name}</TableCell>
							<TableCell>{file.type}</TableCell>
							<TableCell>{formatFileSize(file.size)}</TableCell>
							<TableCell>{file.modified.toLocaleDateString()}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	}

	return (
		<div className="grid grid-cols-4 gap-4">
			{files.map((file) => (
				<Card key={file.id} onClick={() => onFileSelect(file)}>
					<CardContent className="p-4">
						<Checkbox checked={isSelected(file)} className="mb-2" />
						<p className="font-medium">{file.name}</p>
						<p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
