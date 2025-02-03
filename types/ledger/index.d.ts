import type { UploadedAttachmentType } from "../shared";

export interface FileItem {
	id: string;
	name: string;
	owner: string;
	lastModified: string;
	size: string;
	access: string[];
	type: "pdf" | "doc" | "image" | "audio" | "video";
	icon: string;
}

export interface SidebarItem {
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	count: number;
	href: string;
}

export type ViewMode = "list" | "grid";

export interface ILedger {
	id: string;
	letters?: File[];
	attachments?: File[];
	sender_name?: string;
	sender_phone_number?: string;
	sender_email?: string;
	carrier_person_first_name?: string;
	carrier_person_middle_name?: string;
	carrier_phone_number?: string;
	document_date?: string;
	ledger_subject?: string;
	ledger_description?: string;
	tracking_number?: string;
	ledger_status?:
		| "PENDING"
		| "IN_REVIEW"
		| "APPROVED"
		| "DELIVERED"
		| "ARCHIVED";
	recipient_name?: string;
	recipient_phone_number?: string;
	job_title?: string;
	department?: string;
	sector?: string;
	created_at?: string;
	priority?: "LOW" | "MEDIUM" | "HIGH";
	metadata_title?: string;
	metadata_content?: string;
	metadata_author?: string;
	metadata_dateCreated?: string;
	metadata_lastModified?: string;
	metadata_keywords?: string;
	metadata_tags?: string;
	metadata_file_type?: string;
	metadata_language?: string;
	metadata_confidentiality?:
		| "PUBLIC"
		| "INTERNAL"
		| "CONFIDENTIAL"
		| "RESTRICTED";
}

export interface ILedgerMyListItem {
	ledger: ILedger;
	shared_by: string;
	shared_at: string; // ISO date string
}

export type ILedgerMyListResponse = ILedgerMyListItem[];

export type documentType = "pdf" | "doc" | "image" | "excel";

export type LedgerDetail = {
	id: string;
	created_at: string;
	updated_at: string;
	sender_name: string;
	sender_phone_number: string;
	sender_email: string;
	carrier_person_first_name: string;
	carrier_person_middle_name: string;
	carrier_phone_number: string;
	ledger_subject: string;
	tracking_number: string;
	recipient_name: string;
	recipient_phone_number: string;
	written_at: string;
	priority: "LOW" | "MEDIUM" | "HIGH";
	metadata_keywords: string;
	metadata_tags: string;
	metadata_file_type: documentType;
	ledger_status?: "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "ARCHIVED";
	metadata_confidentiality?:
		| "PUBLIC"
		| "INTERNAL"
		| "CONFIDENTIAL"
		| "RESTRICTED";
	ledger_pdf: string | null;
	job_title: string;
	department: string;
	letter: UploadedAttachmentType[];
	attachment: UploadedAttachmentType[];
};
