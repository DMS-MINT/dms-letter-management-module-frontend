"use client";

import { Download, LaptopMinimal, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { MINT, PENTAGRAM, QR_CODE } from "@/constants";
const ICON_SIZE: number = 14;

export default function CoverPage() {
	const [participants, setParticipants] = useState<{
		primary: number;
		cc: number;
		bcc: number;
	}>({
		primary: 1,
		cc: 1,
		bcc: 1,
	});

	return (
		<div className=" bg-white px-16 py-14 w-[797px] h-[280mm] border border-gray-300">
			<div className="flex flex-col h-full">
				<header className="flex justify-between items-center">
					<img src={PENTAGRAM} alt="Logo 1" className="w-20 h-20" />
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
					<img src={MINT} alt="Logo 1" className="w-28 h-20" />
				</header>

				<hr className="mb-2 border-b-1 border-black" />

				<div className="flex flex-col items-end gap-1 font-serif">
					<div className="flex gap-2 ">
						<div className="flex flex-col  ">
							<p className="text-sm  text-gray-600">ቁጥር (ref.no)</p>
						</div>
						<div className="flex flex-col w-32 font-mono">
							<p>DOC-2024-0001</p>
							<hr className="border-b-1 border-black" />
						</div>
					</div>
					<div className="flex gap-2 font-serif">
						<div className="flex flex-col ">
							<p className="text-sm  text-gray-600">ቀን (Date)</p>
						</div>
						<div className="flex flex-col w-32 font-mono  ">
							<p>ሐምሌ 7 /2016 </p>
							<hr />
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-1 pt-2 font-serif ">
					{Array.from({ length: participants.primary }).map((_, index) => (
						<div key={index} className="flex gap-2">
							<p className="text-lg text-black">ለ</p>
							<input type="text" className="border border-black" />
							{index === participants.primary - 1 ? (
								<button
									onClick={() =>
										setParticipants((prevParticipants) => ({
											...prevParticipants,
											primary: prevParticipants.primary + 1,
										}))
									}
								>
									Add
								</button>
							) : (
								<button
									onClick={() =>
										setParticipants((prevParticipants) => ({
											...prevParticipants,
											primary: prevParticipants.primary - 1,
										}))
									}
								>
									Remove
								</button>
							)}
						</div>
					))}
					<p className="text-lg text-black underline">አዲስ አበባ</p>
				</div>

				<p className="text-lg text-black text-center ">
					ጉዳዩ:- <input type="text" className="border border-black" />
				</p>

				<div className="flex flex-col font-serif flex-1 overflow-hidden my-1">
					<textarea name="" id="" className="h-full"></textarea>
				</div>

				<div className="w-64 h-24 ml-auto flex justify-center items-center gap-1 flex-col bg-yellow-300">
					ፈርም
					<Download />
				</div>

				<div className="pb-3 font-serif">
					<p>ግልባጭ:-</p>
					<ul className="pl-5">
						<div className="flex flex-col gap-1 pt-1 font-serif ">
							{Array.from({ length: participants.cc }).map((_, index) => (
								<div key={index} className="flex gap-2">
									<p className="text-lg text-black">ለ</p>
									<input type="text" className="border border-black" />
									{index === participants.cc - 1 ? (
										<button
											onClick={() =>
												setParticipants((prevParticipants) => ({
													...prevParticipants,
													cc: prevParticipants.cc + 1,
												}))
											}
										>
											Add
										</button>
									) : (
										<button
											onClick={() =>
												setParticipants((prevParticipants) => ({
													...prevParticipants,
													cc: prevParticipants.cc - 1,
												}))
											}
										>
											Remove
										</button>
									)}
								</div>
							))}

							<p className="underline">ኢ.ቴ.ሚ</p>
						</div>
					</ul>
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
						<img src={QR_CODE} alt="Logo 1" className="w-20 aspect-square ml-auto" />
					</div>
				</footer>
			</div>
		</div>
	);
}
