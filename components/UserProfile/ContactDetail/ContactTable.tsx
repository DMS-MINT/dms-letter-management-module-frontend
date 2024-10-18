"use client";

import { DeleteContacts, getContacts } from "@/actions/user_module/action";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useToastMutation } from "@/hooks";
import { getInitials } from "@/lib/utils/getInitials";
import type { ContactType } from "@/types/user_module";
import {
	ChevronLeft,
	ChevronRight,
	CirclePlus,
	MoreHorizontal,
	Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CustomSheet } from "../CustomSheet";

const ITEMS_PER_PAGE = 5; // Number of items per page

export default function ContactTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [contacts, setContacts] = useState<ContactType[]>([]);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [selectedContact, setSelectedContact] = useState<ContactType | null>(
		null
	);
	const [isAdding, setIsAdding] = useState(false);

	const handleOpenSheet = (
		contact: ContactType | null,
		isAdding: boolean = false
	) => {
		setSelectedContact(contact);
		setIsAdding(isAdding);
		setIsSheetOpen(true);
	};

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};

	const fetchContacts = async () => {
		const result = await getContacts();
		if (result.ok) {
			setContacts(result.message);
		} else {
			console.error("Error fetching contacts:", result.message);
		}
	};

	useEffect(() => {
		fetchContacts();
	}, []);

	const { mutate: deleteContactMutation } = useToastMutation<string>(
		"deleteContact",
		DeleteContacts,
		"ማህደሮችዎን በመሰረዝ ላይ፣ እባክዎ ይጠብቁ..."
	);

	// Filter contacts based on search query
	const filteredContacts = contacts.filter((contact) => {
		return (
			contact.full_name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
			contact.full_name_am.toLowerCase().includes(searchQuery.toLowerCase()) ||
			contact.address.city_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
			contact.address.city_am.toLowerCase().includes(searchQuery.toLowerCase()) ||
			contact.phone_number?.toString().includes(searchQuery.toLowerCase())
		);
	});

	// Calculate the index range for the current page
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentContacts = filteredContacts.slice(startIndex, endIndex);

	// Calculate the total number of pages
	const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);

	// Handle page change
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<Card className="my-8">
			<CardHeader>
				<CardTitle>የእርስዎ ማህደሮች</CardTitle>
				<CardDescription>የእርስዎን የግል ማህደሮች እና መረጃቸውን ያስተዳድሩ።</CardDescription>
				<span className="flex w-full  items-center justify-end  text-sm text-muted-foreground">
					<Button
						className="flex items-center gap-2"
						onClick={() => handleOpenSheet(null, true)}
					>
						<CirclePlus size={18} />
						አዲስ ማህደሮች
					</Button>
				</span>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<input
						type="text"
						placeholder="የማህደር መረጃዎችን ፈልግ..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full rounded border p-2"
					/>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="hidden sm:table-cell">ምስል</TableHead>
							<TableHead>ሙሉ ስም</TableHead>
							<TableHead>አድራሻ</TableHead>
							<TableHead>ስልክ</TableHead>
							<TableHead>ኢሜይል</TableHead>
							<TableHead>ተግባሮች</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentContacts.map((contact) => (
							<TableRow key={contact.id}>
								<TableCell className="hidden w-16 sm:table-cell">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600">
										{getInitials(contact.full_name_en)}
									</div>
								</TableCell>

								<TableCell className="table-cell w-80">
									<div className="flex flex-col gap-1">
										<span className="font-bold">{contact.full_name_am}</span>
										<span>{contact.full_name_en}</span>
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell sm:grid-cols-1 sm:gap-1">
									<div className="font-bold">{contact.address.city_am}</div>
									<div>{contact.address.city_en}</div>
								</TableCell>

								<TableCell>{contact.phone_number}</TableCell>
								<TableCell>{contact.email}</TableCell>

								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup="true" size="icon" variant="ghost">
												<MoreHorizontal className="h-4 w-4" />
												<span className="sr-only">ተግባሮች</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>ተግባሮች</DropdownMenuLabel>
											{/* <DropdownMenuItem
												onClick={() => handleOpenSheet(contact)}
												className="flex items-center gap-2 text-green-500"
											>
												<Pencil size={15} /> አርም
											</DropdownMenuItem> */}
											<DropdownMenuItem
												className="flex items-center gap-2 text-red-500"
												onClick={() => deleteContactMutation(contact.id)}
											>
												<Trash size={15} />
												አጥፋ
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-center justify-between">
					<div className="text-xs text-muted-foreground">
						<strong>{startIndex + 1}</strong> -{" "}
						<strong>{Math.min(endIndex, filteredContacts.length)}</strong> በማሳየት ላይ ከ{" "}
						<strong>{filteredContacts.length}</strong> ማህደሮች
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							disabled={currentPage === 1}
							size="icon"
							onClick={() => handlePageChange(currentPage - 1)}
						>
							<ChevronLeft />
						</Button>
						<span>
							ገጽ <strong>{currentPage}</strong> ከ <strong>{totalPages}</strong>
						</span>
						<Button
							variant="outline"
							size="icon"
							disabled={currentPage === totalPages}
							onClick={() => handlePageChange(currentPage + 1)}
						>
							<ChevronRight />
						</Button>
					</div>
				</div>
			</CardFooter>

			<CustomSheet
				isAdding={isAdding}
				isOpen={isSheetOpen}
				onClose={handleCloseSheet}
				contact={selectedContact}
			/>
		</Card>
	);
}
