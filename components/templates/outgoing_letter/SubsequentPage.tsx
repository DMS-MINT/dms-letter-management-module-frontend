"use client";

import { Download, LaptopMinimal, Mail, Phone } from "lucide-react";

const ICON_SIZE: number = 14;

export default function CoverPage() {
	return (
		<div className=" bg-white px-16 py-14 w-[797px] h-[280mm] border border-gray-300">
			<div className="flex flex-col h-full">
				<header className="flex justify-between items-center">
					<img src="/image/star.png" alt="Logo 1" className="w-20 h-20" />
					<div className="flex flex-col items-center w-full font-serif">
						<h2 className="text-lg font-bold text-gray-800 text-center">
							በ ኢትዮጲያ ፌደረላዊ ሪፐብሊክ
						</h2>
						<h2 className="text-lg font-bold text-gray-800 text-center">
							የኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር
						</h2>
						<p className="text-base  text-gray-600 text-center">
							The Federal Democratic Republic of Ethiopia
						</p>
						<p className="text-base  text-gray-600 text-center">
							Minister of Innovation and Technology
						</p>
					</div>
					<img src="/image/innovation.png" alt="Logo 1" className="w-28 h-20" />
				</header>

				<hr className="border-b-1 border-black" />

				<div className="flex flex-col font-serif flex-1 my-1">
					<textarea name="" id="" className="h-full"></textarea>
				</div>

				<hr className="mb-1 border-b-1 border-black mt-auto" />

				<footer className="flex justify-between items-center">
					<div className="flex flex-col gap-1 text-[10px] flex-1">
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
					<div className="flex flex-col items-center w-fit">
						<h2 className="text-xl font-bold text-gray-800 text-center">
							ከእርምጃ ወደ ሩጫ
						</h2>
						<p className="text-base text-gray-600 text-center">
							From Faciltator to Main Actor
						</p>
					</div>
					<div className="flex-1">
						<img
							src="/image/qr.png"
							alt="Logo 1"
							className="w-20 aspect-square ml-auto"
						/>
					</div>
				</footer>
			</div>
		</div>
	);
}
