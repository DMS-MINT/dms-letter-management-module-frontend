"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentInfo } from "./DocumentInfo";

import { Card, CardContent } from "@/components/ui/card";
import { LedgerDetail } from "@/types/ledger";
import { CarrierInfo } from "./CarrierInfo";
import { MetadataInfo } from "./MetadataInfo";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip } from "lucide-react";
import FileDisplayList from "./FileDisplay";

export type filePreviewType = {
	files: { fileUrl: string; fileType: string; fileName: string }[];
	attachments: { fileUrl: string; fileType: string; fileName: string }[];
};

export const DocumentDetail: React.FC<{ data: LedgerDetail }> = ({ data }) => {
	const [activeTab, setActiveTab] = useState("document");

	const [showletter, setShowLetter] = useState(true);
	const [showAttachement, setShowAttachement] = useState(false);

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
			fileUrl: `http://localhost:8000${file.file}`,
			fileType: file.file_type,
			fileName: file.file_name,
		})),
		attachments: data.attachment.map((file) => ({
			fileUrl: `http://localhost:8000${file.file}`,
			fileType: file.file_type,
			fileName: file.file_name,
		})),
	};

	return (
		<div className="container mx-auto p-4">
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
		</div>
	);
};
