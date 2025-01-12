import { ledgerType } from "@/types/ledger";

export const mockLedgerData: ledgerType = {
	carrier_person_first_name: "John",
	carrier_person_last_name: "Doe",
	carrier_phone_number: "+1234567890",
	carrier_type: "INDIVIDUAL",
	document_type: "Letter",
	document_date: "2023-06-15",
	document_owner: "Jane Smith",
	ledger_id: "LD12345",
	ledger_subject: "Important Business Proposal",
	ledger_description: "Detailed proposal for new project initiative",
	ledger_type: "INCOMING",
	delivery_status: "PENDING",
	metadata_title: "Business Proposal 2023",
	metadata_description: "Comprehensive business proposal for Q3 2023",
	metadata_author: "Jane Smith",
	metadata_dateCreated: "2023-06-10",
	metadata_lastModified: "2023-06-14",
	metadata_version: "1.0",
	metadata_status: "IN_REVIEW",
	metadata_confidentiality: "CONFIDENTIAL",
	sender_name: "Jane Smith",
	sender_email: "jane.smith@example.com",
	recipient_name: "John Doe",
	job_title: "Project Manager",
	department: "Operations",
	status: "PENDING",
	priority: "HIGH",
	deadline: "2023-07-01",
	letters: [
		new File([], "page1.pdf"),
		new File([], "page2.pdf"),
		new File([], "page3.pdf"),
	],
};

export const documentPages = [
	"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nDuAsvhqmX23LPwrE2w1SS8Tl3DyAM.png#page1",
	"https://drive.google.com/file/d/1tmqmRqqgJMApF2-mMa0KdB5xsRJq8s9X/preview",
	"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nDuAsvhqmX23LPwrE2w1SS8Tl3DyAM.png#page3",
];
