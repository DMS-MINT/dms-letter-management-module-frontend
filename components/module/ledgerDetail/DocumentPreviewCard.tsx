import { Card, CardContent } from "@/components/ui/card";
import { DOCS } from "@/constants";
import { documentType } from "@/types/ledger";

const DocumentPreviewCard = ({
	fileType,
	fileName,
}: {
	fileType: documentType;
	fileName: string;
}) => {
	const getPreviewSrc = (type: documentType) => {
		switch (type) {
			case "pdf":
				return "/docs/user-manual.pdf";
			case "image":
				return "/placeholder.svg"; // Replace with actual image preview URL if available
			case "excel":
				return "/icons/excel-icon.svg";
			case "doc":
				return "/icons/doc-icon.svg";
			default:
				return "/icons/unknown-file-icon.svg";
		}
	};

	return (
		<Card>
			<CardContent className="p-4">
				<h2 className="mb-4 text-xl font-semibold">Document Preview</h2>
				<div className="aspect-w-3 aspect-h-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-200">
					<img
						src={getPreviewSrc(fileType)}
						alt={`${fileType} Preview`}
						className="h-full w-full object-contain"
					/>
				</div>
				<p className="mt-4 text-center text-gray-600">
					{fileName || "Untitled Document"}
				</p>
			</CardContent>
		</Card>
	);
};

export default DocumentPreviewCard;
