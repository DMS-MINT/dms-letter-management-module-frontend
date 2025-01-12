import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ledgerType } from "@/types/ledger";

export const MetadataInfo: React.FC<{ data: ledgerType }> = ({ data }) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Card>
				<CardHeader>
					<CardTitle>Document Metadata</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid grid-cols-2 gap-2">
						<dt className="font-semibold">Title:</dt>
						<dd>{data.metadata_title}</dd>
						<dt className="font-semibold">Description:</dt>
						<dd>{data.metadata_description}</dd>
						<dt className="font-semibold">Author:</dt>
						<dd>{data.metadata_author}</dd>
						<dt className="font-semibold">Created:</dt>
						<dd>{data.metadata_dateCreated}</dd>
						<dt className="font-semibold">Last Modified:</dt>
						<dd>{data.metadata_lastModified}</dd>
						<dt className="font-semibold">Version:</dt>
						<dd>{data.metadata_version}</dd>
					</dl>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Additional Metadata</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid grid-cols-2 gap-2">
						<dt className="font-semibold">Status:</dt>
						<dd>
							<Badge>{data.metadata_status}</Badge>
						</dd>
						<dt className="font-semibold">Confidentiality:</dt>
						<dd>
							<Badge variant="secondary">{data.metadata_confidentiality}</Badge>
						</dd>
						<dt className="font-semibold">Keywords:</dt>
						<dd>{data.metadata_keywords || "N/A"}</dd>
						<dt className="font-semibold">Tags:</dt>
						<dd>{data.metadata_tags || "N/A"}</dd>
						<dt className="font-semibold">Category:</dt>
						<dd>{data.metadata_category || "N/A"}</dd>
						<dt className="font-semibold">File Type:</dt>
						<dd>{data.metadata_fileType || "N/A"}</dd>
					</dl>
				</CardContent>
			</Card>
		</div>
	);
};
