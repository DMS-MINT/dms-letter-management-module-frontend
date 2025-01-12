import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ledgerType } from "@/types/ledger";

export const CarrierInfo: React.FC<{ data: ledgerType }> = ({ data }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Carrier Information</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid grid-cols-2 gap-2">
					<dt className="font-semibold">Name:</dt>
					<dd>{`${data.carrier_person_first_name} ${data.carrier_person_last_name}`}</dd>
					<dt className="font-semibold">Phone:</dt>
					<dd>{data.carrier_phone_number}</dd>
					<dt className="font-semibold">Type:</dt>
					<dd>{data.carrier_type}</dd>
					<dt className="font-semibold">Organization ID:</dt>
					<dd>{data.carrier_organization_id || "N/A"}</dd>
					<dt className="font-semibold">Plate Number:</dt>
					<dd>{data.carrier_plate_number || "N/A"}</dd>
				</dl>
			</CardContent>
		</Card>
	);
};
