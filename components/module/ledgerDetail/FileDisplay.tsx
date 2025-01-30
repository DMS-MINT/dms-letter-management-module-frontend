import DocumentViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface filePreviewType {
	files: string[];
	fileType: string;
	fileName: string;
}

interface FileDisplayProps {
	files: filePreviewType;
	initialIndex: number;
}

function FileDisplay({ files, initialIndex }: FileDisplayProps) {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const currentFile = files.files[currentIndex];
	const fileType = files.fileType;

	const handleNext = () => {
		if (currentIndex < files.files.length - 1) setCurrentIndex(currentIndex + 1);
	};

	const handlePrev = () => {
		if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
	};

	const isPreviewable = fileType === "pdf" || fileType === "image/jpeg" || fileType === "image/png" || fileType === "image/jpg";

	return (
		<div className="flex flex-col items-center justify-center">
			{isPreviewable ? (
				fileType === "pdf" ? (
					<DocumentViewer
						documents={[{ uri: currentFile }]}
						activeDocument={{ uri: currentFile }}
						pluginRenderers={DocViewerRenderers}
						style={{ width: "100%", height: "500px" }}
					/>
				) : (
					<Image
						src={currentFile}
						alt={files.fileName}
						width={600}
						height={600}
						className="h-auto w-full object-contain sm:w-96 lg:h-[600px] lg:w-[600px] xl:h-[520px] xl:w-[800px]"
					/>
				)
			) : (
				<div className="text-center">
					<p className="mb-4 text-lg font-medium">
						{files.fileName} ({fileType}) is not previewable.
					</p>
					<a
						href={currentFile}
						download={files.fileName}
						className="hover:bg-primary-dark inline-flex items-center rounded bg-primary px-4 py-2 text-white"
					>
						<Download className="mr-2" size={18} />
						Download File
					</a>
				</div>
			)}

			<div className="mt-4 flex w-full items-center justify-between bg-background">
				<button
					onClick={handlePrev}
					disabled={currentIndex === 0}
					className="flex h-10 w-10 items-center justify-center rounded-full bg-primary disabled:opacity-50"
				>
					<ChevronLeft size={20} className="text-muted" />
				</button>
				<p className="text-center text-lg font-semibold">
					File {currentIndex + 1} of {files.files.length}
				</p>
				<button
					onClick={handleNext}
					disabled={currentIndex === files.files.length - 1}
					className="flex h-10 w-10 items-center justify-center rounded-full bg-primary disabled:opacity-50"
				>
					<ChevronRight size={20} className="text-muted" />
				</button>
			</div>
		</div>
	);
}

export default function FileDisplayList({ files }: { files: filePreviewType }) {
	return (
		<div className="space-y-4">
			{files.files.length > 0 ? (
				<FileDisplay files={files} initialIndex={0} />
			) : (
				<p>No files attached.</p>
			)}
		</div>
	);
}
