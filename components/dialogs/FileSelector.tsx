"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFileSelection } from "@/hooks/useFileSelection";
import { sortFiles } from "@/lib/utils/fileUtils";
import type {
	IFileItem,
	SortOption,
	ViewOption,
} from "@/types/shared/AttachmentType";
import { LayoutGrid, List, RefreshCw } from "lucide-react";
import React, { useCallback, useState } from "react";
import { SystemFileList } from "./SystemFileList";

// Mock data for system files
const mockSystemFiles: IFileItem[] = [
	{
		id: "1",
		name: "Document.pdf",
		type: "file",
		size: 1024 * 1024,
		modified: new Date("2023-01-01"),
	},
	{
		id: "2",
		name: "Image.jpg",
		type: "file",
		size: 2 * 1024 * 1024,
		modified: new Date("2023-02-15"),
	},
	{
		id: "3",
		name: "Folder",
		type: "folder",
		size: 0,
		modified: new Date("2023-03-10"),
	},
	// Add more mock files as needed
];

export const FileSelector: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<"computer" | "system">("computer");
	const [sortBy, setSortBy] = useState<SortOption>("name");
	const [view, setView] = useState<ViewOption>("list");
	const [systemFiles, setSystemFiles] = useState<IFileItem[]>(mockSystemFiles);

	const { selectedFiles, toggleFileSelection, isFileSelected } =
		useFileSelection();

	const handleRefresh = useCallback(() => {
		// In a real application, this would fetch the latest files from the server
		setSystemFiles([...mockSystemFiles]);
	}, []);

	const sortedSystemFiles = sortFiles(systemFiles, sortBy);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			// Process the uploaded files
			console.log("Uploaded files:", files);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Select Files</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>Select Files</DialogTitle>
				</DialogHeader>
				<Tabs
					value={activeTab}
					onValueChange={(value) => setActiveTab(value as "computer" | "system")}
				>
					<TabsList>
						<TabsTrigger value="computer">From My Computer</TabsTrigger>
						<TabsTrigger value="system">From System</TabsTrigger>
					</TabsList>
					<TabsContent value="computer">
						<input type="file" multiple onChange={handleFileUpload} />
					</TabsContent>
					<TabsContent value="system">
						<div className="mb-4 flex justify-between">
							<Button variant="outline" size="sm" onClick={handleRefresh}>
								<RefreshCw className="mr-2 h-4 w-4" />
								Refresh
							</Button>
							<div className="flex space-x-2">
								<Select
									value={sortBy}
									onValueChange={(value) => setSortBy(value as SortOption)}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Sort by" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="name">Name</SelectItem>
										<SelectItem value="size">Size</SelectItem>
										<SelectItem value="modified">Modified</SelectItem>
									</SelectContent>
								</Select>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setView(view === "list" ? "grid" : "list")}
								>
									{view === "list" ? (
										<LayoutGrid className="h-4 w-4" />
									) : (
										<List className="h-4 w-4" />
									)}
								</Button>
							</div>
						</div>
						<SystemFileList
							files={sortedSystemFiles}
							sortBy={sortBy}
							view={view}
							onFileSelect={toggleFileSelection}
							isSelected={isFileSelected}
						/>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};
