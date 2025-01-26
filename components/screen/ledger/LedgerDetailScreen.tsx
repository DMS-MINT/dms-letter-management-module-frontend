"use client";
import { DocumentDetail } from "@/components/module/ledgerDetail/DocumentDetail";
import { useQuery } from "@tanstack/react-query";
import { getLedgerById } from "@/actions/ledger/action";
import { toast } from "react-toastify"; // Assuming you use react-toastify for notifications

export default function LedgerDetailScreen({ id }: { id: string }) {
	const {
		data: ledgerData,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["ledger", { id }], // Use a unique key with id
		queryFn: async () => {
			try {
				const response = await getLedgerById(id); // Fetch ledger data
				return response;
			} catch (error: any) {
				toast.dismiss(); // Dismiss any existing toasts
				toast.error(error.message); // Show error toast
				throw error; // Throw the error so it can be handled by the query
			}
		},
		staleTime: Infinity, // Prevent refetching by setting staleTime to Infinity
	});

	// Handling loading state
	if (isLoading) {
		return <div>Loading...</div>;
	}

	// Handling error state
	if (error instanceof Error) {
		return <div>Error: {error.message}</div>;
	}

	// If data is available, render the DocumentDetail component
	return <DocumentDetail data={ledgerData?.message} />;
}
