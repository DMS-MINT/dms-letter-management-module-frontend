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
	created_at: string;
	updated_at: string;
	ledger_subject: string;
	ledger_description: string;
	ledger_type: "INCOMING" | "OUTGOING"; // Example values, adjust as needed
	received_at: string;
	status: "PENDING" | "APPROVED" | "REJECTED"; // Example values, adjust as needed
	approved_by: string;
	approved_at: string;
	reference_number: string;
	deadline: string;
	category: string;
	access: string[];
	priority: "LOW" | "MEDIUM" | "HIGH"; // Example values, adjust as needed
	tracking_number: string;
	ledger_pdf: string;
	icon: string;
	type: "pdf" | "doc" | "image" | "audio" | "video";
	letters: File[];
	attachments: File[];
	size: number;
	owner: string;
	lastModified: Date;
}

export interface ledgerType {
	carrier_person_first_name?: string;
	carrier_person_middle_name?: string;
	carrier_person_last_name?: string;
	carrier_phone_number?: string;
	carrier_type?: "INDIVIDUAL" | "ORGANIZATION";
	carrier_organization_id?: string;
	carrier_plate_number?: string;
	letters?: File[];
	attachments?: File[];
	additional_message?: string;
	document_type?: "Letter" | "Invoice" | "Receipt" | "Report" | "Other";
	document_date?: string;
	document_owner?: string;
	ledger_id?: string; // autofilled by the system
	ledger_subject?: string; //filled by the record officer
	ledger_description?: string; //filled by the record officer
	ledger_type?: "INCOMING" | "OUTGOING" | "PERSONAL"; //filled by the record officer
	delivery_medium?: string;
	delivery_channel?: string;
	delivery_organization?: string;
	tracking_number?: string; // autofilled by the system
	expected_delivery_date?: string;
	delivery_status?: "PENDING" | "STAMPED" | "DELIVERED";

	metadata_title?: string; // optional, can be filled by the record officer and the carrier
	metadata_description?: string; // optional, can be filled by the record officer and the carrier
	metadata_author?: string; // optional, can be filled by the record officer and the carrier
	metadata_dateCreated?: string; // optional, can be filled by the record officer and the carrier
	metadata_lastModified?: string; // optional, can be filled by the record officer and the carrier
	metadata_version?: string; // optional, can be filled by the record officer and the carrier
	metadata_keywords?: string; // optional, can be filled by the record officer and the carrier
	metadata_tags?: string; // optional, can be filled by the record officer and the carrier
	metadata_category?: string; // optional, can be filled by the record officer and the carrier
	metadata_fileType?: string; // optional, can be filled by the record officer and the carrier
	metadata_language?: string; // optional, can be filled by the record officer and the carrier
	metadata_status?:
		| "DRAFT"
		| "IN_REVIEW"
		| "APPROVED"
		| "PUBLISHED"
		| "ARCHIVED"; // autofilled by the system
	metadata_confidentiality?:
		| "PUBLIC"
		| "INTERNAL"
		| "CONFIDENTIAL"
		| "RESTRICTED"; // filled by the record officer and the carrier
	metadata_source_system?: string;
	sender_name?: String;
	sender_phone_number?: String;
	sender_email?: String;
	sender_address?: String;
	sender_type?: "INDIVIDUAL" | "ORGANIZATION";
	recipient_name?: string; // filled by the record officer
	recipient_phone_number?: string; // filled by the record officer
	job_title?: string; // filled by the record officer
	department?: string; // filled by the record officer
	sector?: string; // filled by the record officer
	received_at?: string; // autofilled by the system
	status?: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED"; // autofilled by the system
	reference_number?: string; // filled by the record officer
	external_reference_id?: string; // filled by the record officer
	priority?: "LOW" | "MEDIUM" | "HIGH"; // filled by the record officer
	approved_by?: string; // autofilled by the system
	approved_at?: string; // autofilled by the system
	deadline?: string;
	category?: string; // filled by the record officer
}

export type documentType = "pdf" | "doc" | "image" | "excel";
