"use client";
import { mockLedgerData } from "@/constants/ledgermockdata";
import { DocumentDetail } from "@/components/module/ledgerDetail/DocumentDetail";

export default function LedgerDetailScreen() {
	// In a real application, you would fetch the data based on the document ID
	// For this example, we're using mock data
	return <DocumentDetail data={mockLedgerData} />;
}
