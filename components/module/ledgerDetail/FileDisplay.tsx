import DocumentViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface FilePreviewType {
	files: { fileUrl: string; fileType: string; fileName: string }[];
}

interface FileDisplayProps {
	files: { fileUrl: string; fileType: string; fileName: string }[];
	initialIndex: number;
}

function FileDisplay({ files, initialIndex }: FileDisplayProps) {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const currentFile = files[currentIndex].fileUrl.startsWith("http")
		? files[currentIndex]
		: {
				...files[currentIndex],
				fileUrl: `http://localhost:8000${files[currentIndex].fileUrl}`,
			};

	const isPreviewable = [
		"application/pdf",
		"image/jpeg",
		"image/png",
		"image/jpg",
	].includes(currentFile.fileType);

	const documents = [
		{
			uri: currentFile.fileUrl,
			fileName: currentFile.fileName,
		},
	];

	return (
		<div className="flex flex-col items-center justify-center">
			{isPreviewable ? (
				currentFile.fileType === "application/pdf" ? (
					<DocumentViewer
						documents={documents}
						activeDocument={documents[0]}
						pluginRenderers={DocViewerRenderers}
						style={{ width: "100%", height: "500px" }}
					/>
				) : (
					<Image
						src={currentFile.fileUrl}
						alt={currentFile.fileName}
						width={600}
						height={600}
						unoptimized={true}
						className="h-auto w-full object-contain sm:w-96 lg:h-[600px] lg:w-[600px] xl:h-[520px] xl:w-[800px]"
					/>
				)
			) : (
				<div className="text-center">
					<p className="mb-4 text-lg font-medium">
						{currentFile.fileName} ({currentFile.fileType}) is not previewable.
					</p>

					<a
						href={currentFile.fileUrl}
						download={currentFile.fileName}
						className="hover:bg-primary-dark inline-flex items-center rounded bg-primary px-4 py-2 text-white"
					>
						<Download className="mr-2" size={18} />
						Download File
					</a>
				</div>
			)}

			<div className="mt-4 flex w-full items-center justify-between bg-background">
				<button
					onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
					disabled={currentIndex === 0}
					className="flex h-10 w-10 items-center justify-center rounded-full bg-primary disabled:opacity-50"
				>
					<ChevronLeft size={20} className="text-muted" />
				</button>
				<p className="text-center text-lg font-semibold">
					File {currentIndex + 1} of {files.length}
				</p>
				<button
					onClick={() =>
						setCurrentIndex(Math.min(currentIndex + 1, files.length - 1))
					}
					disabled={currentIndex === files.length - 1}
					className="flex h-10 w-10 items-center justify-center rounded-full bg-primary disabled:opacity-50"
				>
					<ChevronRight size={20} className="text-muted" />
				</button>
			</div>
		</div>
	);
}

export default function FileDisplayList({
	files,
}: {
	files: { fileUrl: string; fileType: string; fileName: string }[];
}) {
	return (
		<div className="space-y-4">
			{files.length > 0 ? (
				<FileDisplay files={files} initialIndex={0} />
			) : (
				<p>No files attached.</p>
			)}
		</div>
	);
}
