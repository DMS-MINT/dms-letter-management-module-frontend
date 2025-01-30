"use client";

import {
	getListofLedger,
	getListofMyLedger,
	shareLedger,
} from "@/actions/ledger/action";
import { getUsers } from "@/actions/user_module/action";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FILE_ICON } from "@/constants";
import { useUserStore } from "@/lib/stores/userStore";
import { convertToEthiopianDate } from "@/lib/utils/convertToEthiopianDate";
import { sortLedgerFiles } from "@/lib/utils/fileUtils";
import type { ILedger, ILedgerMyListItem, ViewMode } from "@/types/ledger";
import type { SortOption } from "@/types/shared";
import type { UserType } from "@/types/user_module";
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
import { toast } from "sonner";

export function LedgerScreen({ permission }: { permission: boolean }) {
	const [viewMode, setViewMode] = useState<ViewMode>("list");
	const [sortBy, setSortBy] = useState<SortOption>("name");
	const router = useRouter();
	const participantScope = "internal_staff";
	const [openShare, setOpenShare] = useState(false);
	const [selectedUser, setSelectedUser] = useState("");
	const [selectedLedgerID, setSelectedLedgerID] = useState("");
	const currentUserPermission = useUserStore(
		(state) => state.currentUser.users_permissions
	);

	const { data: options } = useQuery({
		queryKey: ["users", { participantScope }],
		queryFn: async () => {
			try {
				const response = await getUsers("all");
				return response;
			} catch (error: any) {
				toast.dismiss();
				toast.error(error.message);
			}
		},
		staleTime: Infinity,
	});
	const {
		data: files = [],
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ["files"],
		queryFn: async () => {
			let response;

			console.log("value of is_staff:", currentUserPermission.is_staff);

			if (currentUserPermission.is_staff) {
				// Staff case: fetch all ledgers
				const res = await getListofLedger();
				response = res.message.map((item: ILedger) => item);
				console.log("response on list", response.message);
			} else {
				// Non-staff case: map to extract ledgers
				const res = await getListofMyLedger();
				response = res.message.map((item: ILedgerMyListItem) => item.ledger);
			}

			if (!response || !Array.isArray(response)) {
				throw new Error(
					"Failed to fetch data or response is not in the expected format"
				);
			}

			// Return processed response
			return response;
		},
	});

	const sortedFiles = sortLedgerFiles(files, sortBy);

	const handleRefresh = () => {
		refetch();
	};

	const handleShare = (ledger: ILedger) => {
		console.log("share");
		setSelectedLedgerID(ledger.id);
		setOpenShare(true);
	};

	const handleDetail = (id: string) => {
		router.push(`/ledger/${id}`);
	};

	if (isLoading) {
		return <Skeleton className="h-[500px] w-full rounded-xl" />;
	}

	if (isError) {
		return <p>Error fetching files. Please try again.</p>;
	}

	const handleSubmit = async () => {
		const response = await shareLedger(selectedLedgerID, selectedUser);
		if (response.ok) {
			toast.success(response.message);
			setOpenShare(false);
		}
	};

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
							<TableHead>Sender Name</TableHead>
							<TableHead>Recieved At</TableHead>
							<TableHead>Recipient Name</TableHead>
							<TableHead>department</TableHead>
							<TableHead>Priority</TableHead>
							<TableHead>Tracking No</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{files &&
							files.map((file: ILedger) => (
								<TableRow key={file.id}>
									<TableCell className="font-medium">
										<div className="flex items-center gap-2">
											<span>
												<Image src={FILE_ICON.folder} alt="icons" width={20} height={20} />
											</span>
											{file.ledger_subject || "N/A"}
										</div>
									</TableCell>
									<TableCell>{file.sender_name || "N/A"}</TableCell>
									<TableCell>
										{file.created_at ? convertToEthiopianDate(file.created_at) : "N/A"}
									</TableCell>
									<TableCell>{file.recipient_name || "N/A"}</TableCell>
									<TableCell>{file.department || "N/A"}</TableCell>
									<TableCell>{file.priority || "N/A"}</TableCell>
									<TableCell>{file.tracking_number || "N/A"}</TableCell>
									<TableCell>{file.ledger_status || "N/A"}</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											<Button
												variant="ghost"
												size="icon"
												onClick={() => handleShare(file)}
											>
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
													{/* <DropdownMenuItem>Download</DropdownMenuItem>
												<DropdownMenuItem>Rename</DropdownMenuItem>
												<DropdownMenuItem>Delete</DropdownMenuItem> */}
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
					{files &&
						files.map((file: ILedger) => (
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
												{file.sender_name || "N/A"}
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
											{/* <DropdownMenuItem>Download</DropdownMenuItem>
										<DropdownMenuItem>Rename</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem> */}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
								<div className="mt-4">
									<p className="text-sm text-muted-foreground">
										{file.created_at ? convertToEthiopianDate(file.created_at) : "N/A"}
									</p>
									<p className="text-sm text-muted-foreground">{file.ledger_subject}</p>
								</div>
							</div>
						))}
				</div>
			)}
			<Dialog open={openShare} onOpenChange={setOpenShare}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>የደብዳቤ ማጋሪያ</DialogTitle>
						<DialogDescription>
							ይህን ደብዳቤ ልታጋራቸው የምትፈልጋቸውን ሰዎች ምረጥ፣ ፈቃዶቻቸውን አዘጋጅ እና ከደብዳቤው ጋር የሚላክ መልእክት
							ጻፍ።
						</DialogDescription>
						<div className="my-6 flex flex-col items-end">
							<Select onValueChange={setSelectedUser}>
								<SelectTrigger className="my-6 w-full">
									<SelectValue placeholder="ደብዳቤውን የሚያጋሩትን ተጠቃሚ ይምረጡ" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>የMINT ሰራተኞች</SelectLabel>
										{options?.message.map((option: UserType) => (
											<SelectItem key={option.id} value={option.id}>
												{option.user_profile?.full_name_am}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>

							<Button className="flex gap-4 bg-green-500 px-4" onClick={handleSubmit}>
								<Share2 className="h-4 w-4" />
								አጋራ
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
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
