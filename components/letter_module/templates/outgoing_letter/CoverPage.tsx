"use client";

import { Download, LaptopMinimal, Mail, Phone } from "lucide-react";
import { IMAGES } from "@/constants";
import { Editor, SelectableInputGroup } from "@/components/shared";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	LetterDetailType,
	NewLetterType,
	ParticipantType,
	RoleEnum,
	SignatureType,
} from "@/types/letter_module";
import {
	handleSubjectChange,
	selectNewLetter,
} from "@/lib/features/letterSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { convertToEthiopianDate } from "@/utils";

const ICON_SIZE: number = 14;

export default function CoverPage({ letter }: { letter: LetterDetailType }) {
	const { subject } = useAppSelector(selectNewLetter);
	const dispatch = useAppDispatch();

	return (
		<div className=" bg-white px-16 py-14 w-[797px] h-[280mm] border border-gray-300">
			<div className="flex flex-col h-full">
				<header className="flex justify-between items-center">
					<img
						src={IMAGES.pentagram}
						alt="Ethiopian flag pentagon star symbol"
						className="w-20 h-20"
					/>
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
					<img
						src={IMAGES.mint}
						alt="Ministry of Innovation and Technology logo"
						className="w-28 h-20"
					/>
				</header>

				<hr className="mb-2 border-b-1 border-black" />

				<div className="flex flex-col items-end gap-1 font-serif">
					<div className="flex gap-2 ">
						<div className="flex flex-col  ">
							<p className="text-sm  text-gray-600">ቁጥር (ref.no)</p>
						</div>
						<div className="flex flex-col w-32 font-mono">
							<p>{letter?.reference_number || ""}</p>
							<hr className="border-b-1 border-black" />
						</div>
					</div>
					<div className="flex gap-2 font-serif">
						<div className="flex flex-col ">
							<p className="text-sm  text-gray-600">ቀን (Date)</p>
						</div>
						<div className="flex flex-col w-32 font-mono  ">
							<p>
								{letter?.created_at ? convertToEthiopianDate(letter.created_at) : ""}
							</p>
							<hr />
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-1 pt-2 font-serif ">
					<SelectableInputGroup groupName={RoleEnum["PRIMARY RECIPIENT"]} />
					<p className="text-lg text-black underline">አዲስ አበባ</p>
				</div>

				<div className="flex gap-2 items-center self-center">
					<Label>ጉዳዩ:-</Label>
					<Input
						type="text"
						value={letter?.subject ? letter.subject : subject}
						onChange={(e) => dispatch(handleSubjectChange(e.target.value))}
					/>
				</div>

				<div className="flex flex-col font-serif flex-1 overflow-hidden my-1">
					<Editor />
				</div>

				<div className="w-64 h-24 ml-auto flex justify-center items-center gap-1 flex-col">
					{letter?.e_signature
						? letter.e_signature.map((signature: SignatureType) => (
								<img
									key={signature.id}
									src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${signature.e_signature}`}
									alt="Your Signature"
								/>
						  ))
						: null}
				</div>

				<div className="pb-3 font-serif">
					<p>ግልባጭ:-</p>
					<ul className="pl-5">
						<div className="flex flex-col gap-1 pt-1 font-serif ">
							<SelectableInputGroup groupName={RoleEnum["CARBON COPY RECIPIENT"]} />
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
						<img
							src={IMAGES.qr_code}
							alt="QR code"
							className="w-20 aspect-square ml-auto"
						/>
					</div>
				</footer>
			</div>
		</div>
	);
}
