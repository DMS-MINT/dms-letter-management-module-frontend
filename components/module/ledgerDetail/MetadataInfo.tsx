import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LedgerDetail } from "@/types/ledger";

export const MetadataInfo: React.FC<{ data: LedgerDetail }> = ({ data }) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Document Metadata</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid grid-cols-2 gap-2">
						<dt className="font-semibold">Status:</dt>
						<dd>
							<Badge>{data.ledger_status}</Badge>
						</dd>
						<dt className="font-semibold">File Type:</dt>
						<dd>{data.metadata_file_type}</dd>
						<dt className="font-semibold">Confidentiality:</dt>
						<dd>
							<Badge variant="secondary">{data.metadata_confidentiality}</Badge>
						</dd>
					</dl>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Additional Metadata</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid grid-cols-2 gap-2">
						<dt className="font-semibold">Keywords:</dt>
						<dd>{data.metadata_keywords || "N/A"}</dd>
						<dt className="font-semibold">Tags:</dt>
						<dd>{data.metadata_tags || "N/A"}</dd>
					</dl>
				</CardContent>
			</Card>
		</div>
	);
};
