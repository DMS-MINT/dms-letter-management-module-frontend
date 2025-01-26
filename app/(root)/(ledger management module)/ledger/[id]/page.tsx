"use client";
import LedgerDetailScreen from "@/components/screen/ledger/LedgerDetailScreen";
import { useParams } from "next/navigation";

export default function Page() {
	const { id } = useParams(); // Extract id from the URL parameters
	const ledgerId = Array.isArray(id) ? id[0] : id;
	return (
		<div>
			<LedgerDetailScreen id={ledgerId} />
			{/* Pass the id as a prop */}
		</div>
	);
}
