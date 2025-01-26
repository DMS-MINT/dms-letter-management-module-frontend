import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LedgerDetail } from "@/types/ledger";

export const CarrierInfo: React.FC<{ data: LedgerDetail }> = ({ data }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Carrier Information</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid grid-cols-2 gap-2">
					<dt className="font-semibold">Carrier:</dt>
					<dd>
						{data.carrier_person_first_name} {data.carrier_person_middle_name}
					</dd>
					<dt className="font-semibold">Carrier Phone:</dt>
					<dd>{data.carrier_phone_number}</dd>
				</dl>
			</CardContent>
		</Card>
	);
};
