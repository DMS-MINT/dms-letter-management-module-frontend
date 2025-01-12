"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FILE_ICON, IMAGES } from "@/constants";
import { convertToEthiopianDate } from "@/lib/utils/convertToEthiopianDate";
import type { NewAttachmentType, UploadedAttachmentType } from "@/types/shared";
import clsx from "clsx";
import { filesize } from "filesize";
import { Dot, Eye, Plus, RotateCcw, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";
import * as uuidv4 from "uuid";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { KioskDisplayPanel } from "@/components/panels";
type Props = {
	editable: boolean;
	newAttachments: NewAttachmentType[];
	uploadedAttachments?: UploadedAttachmentType[];
	removedAttachmentsIds: string[];
	addNewAttachment: (_attachment: NewAttachmentType) => void;
	removeNewAttachment: (_id: string) => void;
	restoreUploadedAttachment: (_id: string) => void;
	removeUploadedAttachment: (_id: string) => void;
};

export default function FileUploadDialog({
	editable,
	newAttachments,
	uploadedAttachments,
	removedAttachmentsIds,
	addNewAttachment,
	removeNewAttachment,
	restoreUploadedAttachment,
	removeUploadedAttachment,
}: Props) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [isKioskVisible, setIsKioskVisible] = useState(false);

	const triggerFileUpload = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const selectedFile = files[0];
			const allowedTypes = [
				"text/plain",
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"image/jpeg",
				"image/png",
				"application/vnd.ms-powerpoint",
				"application/vnd.openxmlformats-officedocument.presentationml.presentation",
				"text/csv",
			];

			if (allowedTypes.includes(selectedFile.type)) {
				const attachment: NewAttachmentType = {
					id: uuidv4.v4(),
					file: selectedFile,
					description: "",
				};
				addNewAttachment(attachment);
			} else {
				toast.error(`ይህን የፋይል አይነት ማያያዝ አይቻልም: ${selectedFile.type}`);
			}
		}
	};

	const getFileIcon = (fileType: string) => {
		const fileExtension = fileType.split("/").pop() as keyof typeof FILE_ICON;
		return FILE_ICON[fileExtension] || FILE_ICON.default;
	};

	const isDeleted = (id: string) => {
		return removedAttachmentsIds.some((removedId) => removedId === id);
	};

	const handleKioskFileSend = (files: { id: string; name: string }[]) => {
		files.forEach((file) => {
			const newAttachment: NewAttachmentType = {
				id: uuidv4.v4(),
				file: new File([], file.name), // Use File API to create a mock file object
				description: "",
			};
			addNewAttachment(newAttachment);
		});
		setIsKioskVisible(false); // Close the kiosk after sending files
	};

	const openKiosk = () => {
		setIsKioskVisible(true);
	};

	const closeKiosk = () => {
		setIsKioskVisible(false);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className="relative flex w-full justify-start gap-2"
				>
					{newAttachments.length > 0 ||
					(uploadedAttachments && uploadedAttachments?.length > 0) ? (
						<>
							<Eye size={20} />
							የተያያዙ ፋይሎች
						</>
					) : (
						<>
							<Plus size={20} />
							ፋይል አያይዝ
						</>
					)}
					<Badge className="absolute -right-1 -top-1 rounded-full">
						{newAttachments.length +
							(uploadedAttachments ? uploadedAttachments.length : 0)}
					</Badge>
				</Button>
			</DialogTrigger>
			<DialogContent className="flex h-[30rem] min-w-[50rem] flex-col">
				<DialogHeader>
					<DialogTitle>የእርስዎን ፋይሎች ያያይዙ</DialogTitle>
					<DialogDescription>
						ከኮምፒዩተርህ ለመምረጥ ንኩ። የሚከተሉትን የፋይል አይነቶች ማያያዝ ይችላሉ፡ Text files (.txt), PDFs
						(.pdf), Word documents (.doc, .docx), JPEG images (.jpg, .jpeg), and PNG
						images (.png).
					</DialogDescription>
				</DialogHeader>
				{newAttachments.length > 0 ||
				(uploadedAttachments && uploadedAttachments?.length > 0) ? (
					<ScrollArea className="h-full w-full flex-1">
						<div className="flex flex-col gap-2">
							{newAttachments.map(({ id, file }) => (
								<div
									key={id}
									className="mb-3 grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md"
								>
									<Image
										src={getFileIcon(file.type)}
										alt={file.name}
										width={40}
										height={40}
										className="h-10 w-10"
									/>
									<div className="overflow-hidden">
										<Link
											href={URL.createObjectURL(file)}
											target="_blank"
											className="overflow-hidden text-ellipsis whitespace-nowrap hover:text-blue-500 hover:underline"
										>
											{file.name}
										</Link>
										<p className="flex text-sm text-gray-600">
											<span>{filesize(file.size)}</span>
										</p>
									</div>
									<Button
										size={"icon"}
										variant={"ghost"}
										className="ml-auto mr-3"
										onClick={() => removeNewAttachment(id)}
									>
										<Trash />
									</Button>
								</div>
							))}
						</div>
						{uploadedAttachments && uploadedAttachments.length > 0 ? (
							<div className="flex flex-col gap-2">
								<p className="mb-3 text-lg">የተያያዙ ፋይሎች</p>
								{uploadedAttachments
									? uploadedAttachments.map(
											({
												id,
												file,
												file_name,
												file_type,
												file_size,
												uploaded_by,
												description,
												created_at,
											}) => (
												<div
													key={id}
													className="mb-3 grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md"
												>
													<Image
														src={getFileIcon(file_type)}
														alt={file_name}
														width={40}
														height={40}
														className="h-10 w-10"
													/>
													<div className="overflow-hidden">
														<Link
															href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/media/${file}`}
															target="_blank"
															className={clsx(
																"overflow-hidden text-ellipsis whitespace-nowrap",
																{
																	"line-through": isDeleted(id) === true,
																	"hover:text-blue-500 hover:underline": isDeleted(id) === false,
																}
															)}
														>
															{file_name}
														</Link>
														<p className="flex text-sm text-gray-600">
															<span>{filesize(file_size)}</span>
															<Dot />
															<span>{convertToEthiopianDate(created_at)}</span>
														</p>
													</div>
													{editable ? (
														isDeleted(id) ? (
															<Button
																size={"icon"}
																variant={"ghost"}
																className="ml-auto mr-3"
																onClick={() => restoreUploadedAttachment(id)}
															>
																<RotateCcw />
															</Button>
														) : (
															<Button
																size={"icon"}
																variant={"ghost"}
																className="ml-auto mr-3"
																onClick={() => removeUploadedAttachment(id)}
															>
																<Trash />
															</Button>
														)
													) : null}
												</div>
											)
										)
									: null}
							</div>
						) : null}
					</ScrollArea>
				) : (
					<div className="flex h-full w-full flex-1 items-center justify-center">
						<Image
							src={IMAGES.cloud_upload}
							alt={"cloud upload"}
							width={180}
							height={180}
							className="h-60 w-60"
						/>
					</div>
				)}
				{/* Kiosk Modal */}
				{/* {isKioskVisible && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
						<div className="w-3/2 relative rounded-lg bg-white p-4">
							<Button
								type="button"
								className="absolute right-3 top-2 text-black "
								onClick={closeKiosk}
							>
								x
							</Button>
							<h2 className="mb-4 text-xl font-bold">Kiosk Uploader</h2>
							<KioskDisplayPanel onSendFiles={handleKioskFileSend} />
						</div>
					</div>
				)} */}
				{editable ? (
					<DialogFooter>
						<Button
							type="button"
							className="flex w-full justify-center gap-2"
							onClick={triggerFileUpload}
						>
							<Plus size={20} />
							ፋይል አያይዝ
						</Button>
						<input
							type="file"
							ref={fileInputRef}
							style={{ display: "none" }}
							onChange={handleFileChange}
						/>
						<Button
							type="button"
							className="flex w-full justify-center gap-2 bg-blue-500 text-white"
							onClick={openKiosk}
						>
							<Plus size={20} />
							ፋይል አያይዝ (ከኪዮስክ)
						</Button>
					</DialogFooter>
				) : null}
			</DialogContent>
		</Dialog>
	);
}
