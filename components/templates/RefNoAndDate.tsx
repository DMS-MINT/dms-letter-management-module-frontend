"use client";

import { convertToEthiopianDate } from "@/lib/utils/convertToEthiopianDate";

export default function RefNoAndDate({
	reference_number,
	published_at,
	showRefNo = true,
}: {
	reference_number?: string;
	published_at: string;
	showRefNo?: boolean;
}) {
	return (
		<div className="my-4 mr-6 flex flex-col self-end">
			{showRefNo && (
				<div className="flex">
					<span>
						<span className="block">ቁጥር</span>
						<span>Ref.No.</span>
					</span>
					<div className="mb-1.5 flex w-36 flex-col self-end">
						<span className="text-center">{reference_number || ""}</span>
						<hr className="border-black" />
					</div>
				</div>
			)}

			<div className="flex">
				<span>
					<span className="block">ቀን</span>
					<span>Date</span>
				</span>
				<div className="mb-1 flex w-full flex-col self-end">
					{published_at ? (
						<>
							<span className="text-center">
								{convertToEthiopianDate(published_at)}
							</span>
							<hr className="w-full border-black" />
						</>
					) : (
						<div className="mb-0.5 w-36 self-end">
							<hr className="ml-2 w-full border-black" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
