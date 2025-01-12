"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FileIcon } from "lucide-react";

interface DocumentThumbnailProps {
	pageNumber: number;
	imageUrl: string;
	isSelected?: boolean;
	onClick?: () => void;
}

export const DocumentThumbnail: React.FC<DocumentThumbnailProps> = ({
	pageNumber,
	imageUrl,
	isSelected = false,
	onClick,
}) => {
	return (
		<Card
			className={`m-1 cursor-pointer p-2 transition-all duration-200 ${
				isSelected ? "ring-2 ring-primary" : ""
			}`}
			onClick={onClick}
		>
			<CardContent className="p-2">
				<div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
					<img
						src={imageUrl}
						alt={`Page ${pageNumber}`}
						className="h-full w-full object-cover"
					/>
					<div className="absolute bottom-0 right-0 rounded-tl-md bg-red-600 p-1">
						<FileIcon className="h-4 w-4 text-white" />
					</div>
				</div>
				<p className="mt-1 text-center text-xs text-muted-foreground">
					Page {pageNumber}
				</p>
			</CardContent>
		</Card>
	);
};
