"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentInfo } from "./DocumentInfo";

import { Card, CardContent } from "@/components/ui/card";
import type { LedgerDetail } from "@/types/ledger";
import { CarrierInfo } from "./CarrierInfo";
import { MetadataInfo } from "./MetadataInfo";
import type { UserType } from "@/types/user_module";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Share2 } from "lucide-react";
import FileDisplayList from "./FileDisplay";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { shareLedger } from "@/actions/ledger/action";
import { getUsers } from "@/actions/user_module/action";
import ReactSelect from "react-select";

export type filePreviewType = {
	files: { fileUrl: string; fileType: string; fileName: string }[];
	attachments: { fileUrl: string; fileType: string; fileName: string }[];
};

export const DocumentDetail: React.FC<{ data: LedgerDetail }> = ({ data }) => {
	const [activeTab, setActiveTab] = useState("document");

	const [showletter, setShowLetter] = useState(true);
	const [showAttachement, setShowAttachement] = useState(false);

	const participantScope = "internal_staff";
	const [openShare, setOpenShare] = useState(false);
	const [selectedUser, setSelectedUser] = useState<UserType[]>([]);
	const [selectedLedgerID, setSelectedLedgerID] = useState("");

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
	const handleShare = (ledger: LedgerDetail) => {
		console.log("share");
		setSelectedLedgerID(ledger.id);
		setOpenShare(true);
	};

	const handleSubmit = async () => {
		for (const userId of selectedUser) {
			const response = await shareLedger(selectedLedgerID, userId.id);
			if (response.ok) {
				toast.success(response.message);
			} else {
				toast.error(
					`Failed to share with user ${userId.user_profile.full_name_am}`
				);
			}
		}
		setOpenShare(false);
	};
	const handleChangeShow = (value: string) => {
		if (value === "letter") {
			setShowLetter(true);
			setShowAttachement(false);
		} else if (value === "attachement") {
			setShowAttachement(true);
			setShowLetter(false);
		}
	};

	const fileView: filePreviewType = {
		files: data.letter.map((file) => ({
			fileUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${file.file}`,
			fileType: file.file_type,
			fileName: file.file_name,
		})),
		attachments: data.attachment.map((file) => ({
			fileUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${file.file}`,
			fileType: file.file_type,
			fileName: file.file_name,
		})),
	};

	return (
		<div className="container mx-auto p-4">
			<div className="grid justify-items-end">
				<Button variant="ghost" size="icon" onClick={() => handleShare(data)}>
					<Share2 className="h-5 w-5" />
				</Button>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div className="col-span-2">
					<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="document">Document</TabsTrigger>
							<TabsTrigger value="carrier">Carrier</TabsTrigger>
							<TabsTrigger value="metadata">Metadata</TabsTrigger>
						</TabsList>
						<TabsContent value="document">
							<DocumentInfo data={data} />
						</TabsContent>
						<TabsContent value="carrier">
							<CarrierInfo data={data} />
						</TabsContent>
						<TabsContent value="metadata">
							<MetadataInfo data={data} />
						</TabsContent>
					</Tabs>
				</div>
				<div className="col-span-1">
					<Card>
						<CardContent className="p-4">
							<h2 className="mb-4 text-xl font-semibold">Document Pages</h2>
							<ScrollArea className="h-[600px] pr-4">
								<div className="grid grid-cols-1 gap-2">
									<div className="flex-1">
										<div className="flex-1">
											{showletter ? (
												<div>
													<FileDisplayList files={fileView.files || []} />
												</div>
											) : (
												<Button onClick={() => handleChangeShow("letter")}>
													Show Letter Preview
												</Button>
											)}
										</div>
										{data.attachment && data.attachment?.length > 0 && (
											<div className="flex-1">
												{showAttachement ? (
													<div>
														<FileDisplayList files={fileView.attachments || []} />
													</div>
												) : (
													<div className="flex justify-end">
														<Button
															onClick={() => handleChangeShow("attachement")}
															size={"sm"}
														>
															<Paperclip size={15} className="mr-2" /> Show Attachement Preview
														</Button>
													</div>
												)}
											</div>
										)}
									</div>
								</div>
							</ScrollArea>
						</CardContent>
					</Card>
				</div>
			</div>
			<Dialog open={openShare} onOpenChange={setOpenShare}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>የደብዳቤ ማጋሪያ</DialogTitle>
						<DialogDescription>
							ይህን ደብዳቤ ልታጋራቸው የምትፈልጋቸውን ሰዎች ምረጥ፣ ፈቃዶቻቸውን አዘጋጅ እና ከደብዳቤው ጋር የሚላክ መልእክት
							ጻፍ።
						</DialogDescription>
						{/* React-Select Dropdown */}
						<div className="my-6 w-full">
							<ReactSelect
								isMulti
								isClearable
								options={options?.message}
								getOptionLabel={(option: UserType) =>
									option.user_profile?.full_name_am?.normalize("NFC")
								}
								getOptionValue={(option) => option.id}
								onChange={(selected) => setSelectedUser(selected as UserType[])}
								isOptionDisabled={(option) =>
									selectedUser.some((user) => user.id === option.id)
								}
								placeholder="ተጠቃሚ ይፈልጉ..."
								className="w-full"
								classNamePrefix="participant_selector"
							/>
						</div>
						<div>
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
};
