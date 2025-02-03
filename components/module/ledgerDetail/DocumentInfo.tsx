import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertToEthiopianDate } from "@/lib/utils/convertToEthiopianDate";
import { LedgerDetail } from "@/types/ledger";

export const DocumentInfo: React.FC<{ data: LedgerDetail }> = ({ data }) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			{/* Document Details Card */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Document Details</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid grid-cols-2 gap-2">
						<dt className="font-semibold">Letter Subject:</dt>
						<dd>{data.ledger_subject}</dd>
						<dt className="font-semibold">Received Date:</dt>
						<dd>
							{data.created_at ? convertToEthiopianDate(data.created_at) : "N/A"}
						</dd>
						<dt className="font-semibold">Owner:</dt>
						<dd>{data.sender_name}</dd>
						<dt className="font-semibold">Sender Phone:</dt>
						<dd>{data.sender_phone_number}</dd>
						<dt className="font-semibold">Sender Email:</dt>
						<dd>{data.sender_email}</dd>
						<dt className="font-semibold">Tracking Number:</dt>
						<dd>{data.tracking_number}</dd>
					</dl>
				</CardContent>
			</Card>

			{/* Status Information Card */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Status Information</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid grid-cols-2 gap-2">
						<dt className="font-semibold">Status:</dt>
						<dd>
							<Badge variant="secondary">{data.ledger_status}</Badge>
						</dd>
						<dt className="font-semibold">Priority:</dt>
						<dd>
							<Badge variant="destructive">{data.priority}</Badge>
						</dd>
						<dt className="font-semibold">Recipient:</dt>
						<dd>{data.recipient_name}</dd>
						<dt className="font-semibold">Recipient Phone:</dt>
						<dd>{data.recipient_phone_number}</dd>
						<dt className="font-semibold">Written Date:</dt>
						<dd>
							{data.written_at ? convertToEthiopianDate(data.written_at) : "N/A"}
						</dd>
					</dl>
				</CardContent>
			</Card>
		</div>
	);
};
