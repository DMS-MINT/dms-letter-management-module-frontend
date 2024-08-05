import { IMAGES } from "@/constants";
import { LaptopMinimal, Mail, Phone } from "lucide-react";
import Image from "next/image";

const ICON_SIZE: number = 14;

export default function OutgoingLetterFooter() {
	return (
		<>
			<hr className="border-b-1 mb-1 mt-auto border-black" />
			<footer className="flex items-center justify-between">
				<div className="flex flex-1 flex-col gap-1 text-[10px]">
					<div className="flex gap-1 ">
						<LaptopMinimal size={ICON_SIZE} />
						<p>WWW.MINT.gov.et</p> {", "}
						<p>mint @ethionet.et </p>
					</div>
					<div className="flex gap-1 ">
						<Phone size={ICON_SIZE} />
						<p>251111264994</p>
					</div>
					<div className="flex gap-1 ">
						<Mail size={ICON_SIZE} />
						<p>2490 </p>
						{", "}
						<p className="block min-h-fit">Addis Ababa Ethiopia </p>
					</div>
				</div>
				<div className="flex w-fit flex-col items-center">
					<h2 className="text-center text-xl font-bold text-gray-800">
						ከእርምጃ ወደ ሩጫ
					</h2>
					<p className="text-center text-base text-gray-600">
						From Faciltator to Main Actor
					</p>
				</div>
				<div className="flex-1">
					<Image
						src={IMAGES.qr_code}
						alt="QR code"
						className="ml-auto aspect-square"
						width={80}
						height={80}
					/>
				</div>
			</footer>
		</>
	);
}
