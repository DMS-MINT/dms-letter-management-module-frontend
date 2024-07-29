"use client";

import { Editor, SelectableInputGroup } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IMAGES } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
	handleSubjectChange,
	selectNewLetter,
} from "@/lib/features/letterSlice";
import type { LetterDetailType, SignatureType } from "@/types/letter_module";
import { RoleEnum } from "@/types/letter_module";
import { convertToEthiopianDate } from "@/utils";
import { LaptopMinimal, Mail, Phone } from "lucide-react";
import Image from "next/image";

const ICON_SIZE: number = 14;

export default function CoverPage({ letter }: { letter: LetterDetailType }) {
	const { subject } = useAppSelector(selectNewLetter);
	const dispatch = useAppDispatch();

	return (
		<div className=" h-[280mm] w-[797px] border border-gray-300 bg-white px-16 py-14">
			<div className="flex h-full flex-col">
				<header className="flex items-center justify-between">
					<Image
						src={IMAGES.pentagram}
						alt="Ethiopian flag pentagon star symbol"
						width={80}
						height={80}
					/>
					<div className="flex w-full flex-col items-center font-serif">
						<h2 className="text-center text-lg font-bold text-gray-800">
							በ ኢትዮጲያ ፌደረላዊ ሪፐብሊክ
						</h2>
						<h2 className="text-center text-lg font-bold text-gray-800">
							የኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር
						</h2>
						<p className="text-center  text-base text-gray-600">
							The Federal Democratic Republic of Ethiopia
						</p>
						<p className="text-center  text-base text-gray-600">
							Minister of Innovation and Technology
						</p>
					</div>
					<Image
						src={IMAGES.mint}
						alt="Ministry of Innovation and Technology logo"
						width={112}
						height={80}
					/>
				</header>

				<hr className="border-b-1 mb-2 border-black" />

				<div className="flex flex-col items-end gap-1 font-serif">
					<div className="flex gap-2 ">
						<div className="flex flex-col  ">
							<p className="text-sm  text-gray-600">ቁጥር (ref.no)</p>
						</div>
						<div className="flex w-32 flex-col font-mono">
							<p>{letter?.reference_number || ""}</p>
							<hr className="border-b-1 border-black" />
						</div>
					</div>
					<div className="flex gap-2 font-serif">
						<div className="flex flex-col ">
							<p className="text-sm  text-gray-600">ቀን (Date)</p>
						</div>
						<div className="flex w-32 flex-col font-mono  ">
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

				<div className="flex items-center gap-2 self-center">
					<Label>ጉዳዩ:-</Label>
					<Input
						type="text"
						value={letter?.subject ? letter.subject : subject}
						onChange={(e) => dispatch(handleSubjectChange(e.target.value))}
					/>
				</div>

				<div className="my-1 flex flex-1 flex-col overflow-hidden font-serif">
					<Editor />
				</div>

				<div className="ml-auto flex h-24 w-64 flex-col items-center justify-center gap-1">
					{letter?.e_signature
						? letter.e_signature.map((signature: SignatureType) => (
								<Image
									key={signature.id}
									src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${signature.e_signature}`}
									alt="Your Signature"
									width={200}
									height={80}
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
			</div>
		</div>
	);
}
