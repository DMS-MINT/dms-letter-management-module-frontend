"use client";

import { getListofLedger } from "@/actions/ledger/action";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FILE_ICON } from "@/constants";
import { useDraftAttachmentStore } from "@/lib/stores";
import { convertToEthiopianDate } from "@/lib/utils/convertToEthiopianDate";
import { sortLedgerFiles } from "@/lib/utils/fileUtils";
import type { ILedger, ViewMode } from "@/types/ledger";
import type { SortOption } from "@/types/shared";
import { useQuery } from "@tanstack/react-query";
import {
	LayoutGrid,
	LayoutList,
	MoreHorizontal,
	RefreshCw,
	Share2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as uuidv4 from "uuid";

export function FileList() {
	const [viewMode, setViewMode] = useState<ViewMode>("list");
	const [sortBy, setSortBy] = useState<SortOption>("name");
	const router = useRouter();

	const {
		data: files = [],
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ["files"],
		queryFn: async () => {
			const response = await getListofLedger();
			if (!response.ok) {
				throw new Error(response.message || "Failed to fetch data");
			}
			return response.message; // Extract the message here
		},
	});

	const sortedFiles = sortLedgerFiles(files, sortBy);

	const handleRefresh = () => {
		refetch();
	};

	const {
		newAttachments,
		removedAttachmentsIds,
		addNewAttachment,
		removeNewAttachment,
		restoreUploadedAttachment,
		removeUploadedAttachment,
		resetAttachmentStore,
	} = useDraftAttachmentStore();

	const handleShare = (ledger: ILedger) => {
		console.log("share");
		if (ledger.letters.length > 1) {
			ledger.letters.forEach((letter) => {
				const id = uuidv4.v4();
				const file = letter; // Use the current letter in the iteration
				const description = "";
				const submitedAttachement = {
					id,
					file,
					description,
				};
				addNewAttachment(submitedAttachement);
			});
		}
	};

	const handleDetail = (id: string) => {
		router.push(`/ledger/${id}`);
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error fetching files. Please try again.</p>;
	}

	return (
		<div className="space-y-4">
			<div className="flex h-8 items-center justify-between">
				<div className="flex gap-2">
					<Button
						variant={viewMode === "list" ? "default" : "outline"}
						size="icon"
						className="h-8"
						onClick={() => setViewMode("list")}
					>
						<LayoutList className="h-4 w-4" />
					</Button>
					<Button
						variant={viewMode === "grid" ? "default" : "outline"}
						size="icon"
						className="h-8"
						onClick={() => setViewMode("grid")}
					>
						<LayoutGrid className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="h-8"
						onClick={handleRefresh}
					>
						<RefreshCw className="mr-2 h-4 w-4" />
						Refresh
					</Button>
				</div>
				<div className="flex gap-2">
					<div className="flex space-x-2">
						<Select
							value={sortBy}
							onValueChange={(value) => setSortBy(value as SortOption)}
						>
							<SelectTrigger className="h-8 w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name">Name</SelectItem>
								<SelectItem value="size">Size</SelectItem>
								<SelectItem value="modified">Last Modified</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Input placeholder="Search ..." width={"200px"} className="h-8" />
				</div>
			</div>

			{viewMode === "list" ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>File Name</TableHead>
							<TableHead>File Owner</TableHead>
							<TableHead>Last Changes</TableHead>
							<TableHead>File Size</TableHead>
							<TableHead>Priority</TableHead>
							<TableHead>Ledger Type</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedFiles.map((file: ILedger) => (
							<TableRow key={file.id}>
								<TableCell className="font-medium">
									<div className="flex items-center gap-2">
										<span>
											<Image src={FILE_ICON.folder} alt="icons" width={20} height={20} />
										</span>
										{file.ledger_subject || "N/A"}
									</div>
								</TableCell>
								<TableCell>{file.approved_by || "N/A"}</TableCell>
								<TableCell>
									{convertToEthiopianDate(file.updated_at) || "N/A"}
								</TableCell>
								<TableCell>{file.deadline || "N/A"}</TableCell>
								<TableCell>{file.priority || "N/A"}</TableCell>
								<TableCell>{file.ledger_type || "N/A"}</TableCell>
								<TableCell>{file.status || "N/A"}</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Button variant="ghost" size="icon" onClick={() => handleShare(file)}>
											<Share2 className="h-4 w-4" />
										</Button>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem onClick={() => handleDetail(file.id)}>
													Details
												</DropdownMenuItem>
												<DropdownMenuItem>Download</DropdownMenuItem>
												<DropdownMenuItem>Rename</DropdownMenuItem>
												<DropdownMenuItem>Delete</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					{sortedFiles.map((file: ILedger) => (
						<div
							key={file.id}
							className="rounded-lg border p-4 transition-colors hover:bg-accent"
						>
							<div className="flex items-start justify-between">
								<div className="flex items-center gap-2">
									<span className="text-2xl">
										<Image src={FILE_ICON.folder} alt="icons" width={30} height={30} />
									</span>
									<div>
										<p className="font-medium">{file.ledger_subject || "N/A"}</p>
										<p className="text-sm text-muted-foreground">
											{file.approved_by || "N/A"}
										</p>
									</div>
								</div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon">
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem onClick={() => handleDetail(file.id)}>
											Details
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => handleShare(file)}>
											Share
										</DropdownMenuItem>
										<DropdownMenuItem>Download</DropdownMenuItem>
										<DropdownMenuItem>Rename</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<div className="mt-4">
								<p className="text-sm text-muted-foreground">
									{convertToEthiopianDate(file.updated_at)}
								</p>
								<p className="text-sm text-muted-foreground">
									{convertToEthiopianDate(file.deadline)}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

{
	/* <TableCell> */
}
{
	/* <div className="flex -space-x-2">
										{file.access.map((user, i) => (
											<Avatar key={i} className="h-6 w-6 border-2 border-background">
												<AvatarImage src={user} />
												<AvatarFallback>U</AvatarFallback>
											</Avatar>
										))}
									</div> */
}
{
	/* </TableCell> */
}
{
	/* <div className="mt-4 flex -space-x-2">
								{file.access.map((user, i) => (
									<Avatar key={i} className="h-6 w-6 border-2 border-background">
										<AvatarImage src={user} />
										<AvatarFallback>U</AvatarFallback>
									</Avatar>
								))}
							</div> */
}
