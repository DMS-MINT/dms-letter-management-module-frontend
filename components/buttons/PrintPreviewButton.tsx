"use client";

import { Printer } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";

export default function PrintPreviewButton({
	pdf_version,
}: {
	pdf_version: string;
}) {
	const { category } = useParams();

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

	return category !== "trash" ? (
		<Button size={"icon"} variant={"outline"} onClick={handlePrint}>
			<Printer size={20} />
		</Button>
	) : null;
}
