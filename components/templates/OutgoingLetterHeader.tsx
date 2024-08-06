import { IMAGES } from "@/constants";
import Image from "next/image";
import { Separator } from "../ui/separator";

export default function OutgoingLetterHeader() {
	return (
		<div className="flex flex-col items-center gap-2">
			<div className="flex items-center justify-center">
				<div className="inline-flex h-auto">
					<Image
						src={IMAGES.pentagram}
						alt="Ethiopian flag pentagon star symbol"
						width={80}
						height={80}
						className="m-0"
					/>
				</div>

				<div className="px-8 text-center text-lg">
					<div className="flex flex-col font-semibold">
						<span>በኢትዮጵያ ፌደራላዊ ዲሞክራሲያዊ ሪፐብሊክ</span>
						<span>የኢኖቬሽንና ቴከኖሎጂ ሚኒስቴር</span>
					</div>
					<div className="flex flex-col">
						<span>The Federal Democratic Republic of Ethiopia</span>
						<span>Minister of Innovation and Technology</span>
					</div>
				</div>

				<div className="inline-flex h-auto">
					<Image
						src={IMAGES.mint}
						alt="Ministry of Innovation and Technology logo"
						width={100}
						height={80}
						className="m-0"
					/>
				</div>
			</div>
			<Separator className="bg-black py-px" />
		</div>
	);
}
