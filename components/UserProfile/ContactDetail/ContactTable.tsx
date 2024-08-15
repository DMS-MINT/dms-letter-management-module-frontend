"use client";

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
import {
	ChevronLeft,
	ChevronRight,
	CirclePlus,
	MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CustomSheet } from "../CustomSheet";

// Define the type for a contact
type Contact = {
	id: number;
	fullName: string;
	fullNameAmharic: string;
	address: string;
	addressAmharic: string;
	phone: string;
	email: string;
	organization: string;
	organizationAmharic: string;
	photo?: string; // URL or base64 string
};

// Sample contact data
const contacts: Contact[] = [
	{
		id: 1,
		fullName: "John Doe",
		fullNameAmharic: "ጆን ዶ",
		address: "123 Elm Street",
		addressAmharic: "123 ኤልም ጎዳና",
		phone: "(555) 123-4567",
		email: "john.doe@example.com",
		organization: "Tech Solutions",
		organizationAmharic: "ቴክ ሱልሽንስ",
		photo: "/images/placeholder.png",
	},
	{
		id: 2,
		fullName: "Jane Smith",
		fullNameAmharic: "ጄን ስሚት",
		address: "456 Oak Avenue",
		addressAmharic: "456 ኦክ አቅድ",
		phone: "(555) 765-4321",
		email: "jane.smith@example.com",
		organization: "Innovate Inc.",
		organizationAmharic: "ኢኖቬት ኢንክ.",
	},
	// Add more contacts as needed
];

const ITEMS_PER_PAGE = 5; // Number of items per page

export default function ContactTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
	const [isAdding, setIsAdding] = useState(false);

	const handleOpenSheet = (
		contact: Contact | null,
		isAdding: boolean = false
	) => {
		setSelectedContact(contact);
		setIsAdding(isAdding);
		setIsSheetOpen(true);
	};

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};

	const handleSave = (updatedContact: Contact) => {
		if (isAdding) {
			// Add new contact logic
			console.log("New contact added:", updatedContact);
		} else {
			// Update the contact logic
			console.log("Updated contact:", updatedContact);
		}
	};
	// Filter contacts based on search query
	const filteredContacts = contacts.filter((contact) => {
		return (
			contact.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			contact.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
			contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
			contact.organization.toLowerCase().includes(searchQuery.toLowerCase())
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
				<CardTitle>የእርስዎ እውቂያዎች</CardTitle>
				<CardDescription>የእርስዎን የግል እውቂያዎች እና መረጃቸውን ያስተዳድሩ።</CardDescription>
				<span className="flex w-full  items-center justify-end  text-sm text-muted-foreground">
					<Button
						className="flex items-center gap-2"
						onClick={() => handleOpenSheet(null, true)}
					>
						<CirclePlus size={18} />
						Add contact
					</Button>
				</span>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<input
						type="text"
						placeholder="Search contacts..."
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
							<TableHead>መስሪያ ቤት</TableHead>
							<TableHead>ተግባሮች</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentContacts.map((contact) => (
							<TableRow key={contact.id}>
								<TableCell className="hidden sm:table-cell">
									{contact.photo ? (
										<Image
											alt={contact.fullName}
											className="aspect-square rounded-md object-cover"
											height={64}
											src={contact.photo}
											width={64}
										/>
									) : (
										<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-600">
											{contact.fullName[0]}
										</div>
									)}
								</TableCell>

								<TableCell className="table-cell">
									<div className="flex flex-col gap-1">
										<span>{contact.fullName}</span>
										<span>{contact.fullNameAmharic}</span>
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell sm:grid-cols-1 sm:gap-1">
									<div>{contact.address}</div>
									<div>{contact.addressAmharic}</div>
								</TableCell>

								<TableCell>{contact.phone}</TableCell>
								<TableCell>{contact.email}</TableCell>
								<TableCell className="hidden sm:table-cell sm:grid-cols-1 sm:gap-1">
									<div>{contact.organization}</div>
									<div>{contact.organizationAmharic}</div>
								</TableCell>

								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup="true" size="icon" variant="ghost">
												<MoreHorizontal className="h-4 w-4" />
												<span className="sr-only">Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem onClick={() => handleOpenSheet(contact)}>
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
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
						<strong>{filteredContacts.length}</strong> እውቂያዎች
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
				onSave={handleSave}
			/>
		</Card>
	);
}
