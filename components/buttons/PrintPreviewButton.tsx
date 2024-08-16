import { Printer } from "lucide-react";
import { Button } from "../ui/button";

export default function PrintPreviewButton({
	pdf_version,
	current_state,
}: {
	pdf_version: string;
	current_state: string;
}) {
	const handlePrint = () => {
		const printWindow = window.open(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}${pdf_version}`
		);
		if (printWindow) {
			printWindow.onload = () => {
				printWindow.print();
			};
		}
	};

	return current_state !== "Trashed" ? (
		<Button
			disabled={pdf_version ? false : true}
			size={"icon"}
			variant={"outline"}
			onClick={handlePrint}
		>
			<Printer size={20} />
		</Button>
	) : null;
}
