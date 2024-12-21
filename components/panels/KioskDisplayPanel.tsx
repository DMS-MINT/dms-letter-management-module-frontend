import React, { useState, useMemo } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";
import { Button } from "../ui/button"; // Assuming you have a Button component
import { ChevronUp, ChevronDown } from "lucide-react"; // Import icons

interface FileData {
	id: string;
	name: string;
	size: number; // in MB
	lastModified: string; // ISO string or timestamp
}

interface KioskDisplayPanelProps {
	onSendFiles: (files: FileData[]) => void; // Callback to handle sending files
}

const KioskDisplayPanel: React.FC<KioskDisplayPanelProps> = ({
	onSendFiles,
}) => {
	const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const files = useMemo(
		() => [
			{
				id: "1",
				name: "Report.pdf",
				size: 1.2,
				lastModified: "2024-12-20T10:30:00Z",
			},
			{
				id: "2",
				name: "Presentation.pptx",
				size: 4.5,
				lastModified: "2024-12-18T14:15:00Z",
			},
			{
				id: "3",
				name: "Image.png",
				size: 0.8,
				lastModified: "2024-12-15T09:00:00Z",
			},
			{
				id: "4",
				name: "Document.docx",
				size: 2.1,
				lastModified: "2024-12-17T11:45:00Z",
			},
			{
				id: "5",
				name: "Image.png",
				size: 0.8,
				lastModified: "2024-12-15T09:00:00Z",
			},
			{
				id: "6",
				name: "Document.docx",
				size: 2.1,
				lastModified: "2024-12-17T11:45:00Z",
			},
		],
		[]
	);

	// Memoize the sorted files based on sort direction
	const sortedFiles = useMemo(() => {
		return [...files].sort((a, b) => {
			const dateA = new Date(a.lastModified).getTime();
			const dateB = new Date(b.lastModified).getTime();
			return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
		});
	}, [sortDirection, files]); // Memoize based on sortDirection

	const toggleFileSelection = (file: FileData) => {
		setSelectedFiles(
			(prevSelected) =>
				prevSelected.some((f) => f.id === file.id)
					? prevSelected.filter((f) => f.id !== file.id) // Deselect
					: [...prevSelected, file] // Select
		);
	};

	const isFileSelected = (file: FileData) =>
		selectedFiles.some((f) => f.id === file.id);

	const handleSend = () => {
		if (selectedFiles.length === 0) {
			alert("No files selected to send.");
			return;
		}
		onSendFiles(selectedFiles);
		setSelectedFiles([]);
	};

	const toggleSortDirection = () => {
		setSortDirection((prevDirection) =>
			prevDirection === "asc" ? "desc" : "asc"
		);
	};

	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				<Button onClick={toggleSortDirection} className="flex items-center">
					Sort by Date
					{sortDirection === "asc" ? (
						<ChevronUp className="ml-2" size={16} />
					) : (
						<ChevronDown className="ml-2" size={16} />
					)}
				</Button>
			</div>
			<div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
				{sortedFiles.map((file) => (
					<Card
						key={file.id}
						className={`transform cursor-pointer border transition-transform hover:scale-105 ${
							isFileSelected(file) ? "border-blue-500" : "border-gray-300"
						} flex h-full flex-col justify-between`}
						onClick={() => toggleFileSelection(file)}
					>
						<CardHeader>
							<CardTitle className="text-sm">{file.name}</CardTitle>
							<CardDescription>{file.size} MB</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-gray-600">
								Last modified:{" "}
								<span className="font-medium">
									{new Date(file.lastModified).toLocaleString()}
								</span>
							</p>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="mt-6">
				<h3 className="text-lg font-bold">Selected Files</h3>
				{selectedFiles.length > 0 ? (
					<ul className="mt-2 list-disc space-y-1 pl-5">
						{selectedFiles.map((file) => (
							<li key={file.id}>
								<span className="font-medium">{file.name}</span> ({file.size} MB)
							</li>
						))}
					</ul>
				) : (
					<p className="mt-2 text-gray-500">No files selected.</p>
				)}
			</div>
			<div className="mt-4 flex justify-end">
				<Button onClick={handleSend} disabled={selectedFiles.length === 0}>
					Send Files
				</Button>
			</div>
		</div>
	);
};

export default KioskDisplayPanel;
