import { Printer } from "lucide-react";
import { memo } from "react";
import { Button } from "../ui/button";

type Props = {
	pdf_version: string;
	current_state: string;
};

function PrintPreviewButton({ pdf_version, current_state }: Props) {
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

export default memo(PrintPreviewButton);
