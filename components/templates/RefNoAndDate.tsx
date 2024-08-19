"use client";

export default function RefNoAndDate({
	reference_number,
	published_at,
}: {
	reference_number: string;
	published_at: string;
}) {
	return (
		<div className="my-4 mr-6 flex flex-col self-end">
			<div className="flex">
				<span>
					<span className="block">ቁጥር</span>
					<span>Ref.No.</span>
				</span>
				<div className="mb-1 flex w-36 flex-col self-end">
					<span className="text-center">{reference_number || ""}</span>
					<hr className="border-black" />
				</div>
			</div>

			<div className="flex">
				<span>
					<span className="block">ቀን</span>
					<span>Date</span>
				</span>
				<div className="mb-1 flex w-full flex-col self-end">
					<span className="text-center">
						{/* {convertToEthiopianDate(published_at) || ""} */}
					</span>
					<hr className="w-full border-black" />
				</div>
			</div>
		</div>
	);
}
