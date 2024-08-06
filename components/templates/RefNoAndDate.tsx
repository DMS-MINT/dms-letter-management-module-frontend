"use client";

import { useParams } from "next/navigation";

export default function RefNoAndDate() {
	const { referenceNumber } = useParams();

	return (
		<div className="my-4 mr-6 flex flex-col self-end">
			<div className="flex">
				<span>
					<span className="block">ቁጥር</span>
					<span>Ref.No.</span>
				</span>
				<div className="mb-1 flex w-36 flex-col self-end">
					<span className="text-center">{referenceNumber || ""}</span>
					<hr className="border-black" />
				</div>
			</div>

			<div className="flex">
				<span>
					<span className="block">ቀን</span>
					<span>Date</span>
				</span>
				<div className="mb-1 flex w-full flex-col self-end">
					<span className="text-center"></span>
					<hr className="w-full border-black" />
				</div>
			</div>
		</div>
	);
}
