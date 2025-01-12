import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ledgerType } from "@/types/ledger";

export const DocumentInfo: React.FC<{ data: ledgerType }> = ({ data }) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Card>
				<CardHeader>
					<CardTitle>Document Details</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid grid-cols-2 gap-2">
						<dt className="font-semibold">Type:</dt>
						<dd>{data.document_type}</dd>
						<dt className="font-semibold">Date:</dt>
						<dd>{data.document_date}</dd>
						<dt className="font-semibold">Owner:</dt>
						<dd>{data.document_owner}</dd>
						<dt className="font-semibold">Ledger ID:</dt>
						<dd>{data.ledger_id}</dd>
						<dt className="font-semibold">Subject:</dt>
						<dd>{data.ledger_subject}</dd>
					</dl>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Status Information</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid grid-cols-2 gap-2">
						<dt className="font-semibold">Ledger Type:</dt>
						<dd>
							<Badge>{data.ledger_type}</Badge>
						</dd>
						<dt className="font-semibold">Delivery Status:</dt>
						<dd>
							<Badge variant="outline">{data.delivery_status}</Badge>
						</dd>
						<dt className="font-semibold">Status:</dt>
						<dd>
							<Badge variant="secondary">{data.status}</Badge>
						</dd>
						<dt className="font-semibold">Priority:</dt>
						<dd>
							<Badge variant="destructive">{data.priority}</Badge>
						</dd>
						<dt className="font-semibold">Deadline:</dt>
						<dd>{data.deadline}</dd>
					</dl>
				</CardContent>
			</Card>
		</div>
	);
};
