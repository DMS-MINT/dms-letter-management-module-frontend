import { IMAGES } from "@/constants";
import Image from "next/image";

export default function BrandingSection() {
	return (
		<section className="flex flex-col justify-between bg-gradient px-24 pb-14 pt-20">
			<div>
				<Image
					src={IMAGES.mint}
					alt="Ministry of Innovation and Technology logo"
					width={250}
					height={250}
				/>

				<h2 className="mb-2 mt-5 text-2xl font-medium text-white">
					የሰነድ አስተዳደር እና ኢ-ፊርማ
				</h2>
				<p className="text-lg font-light text-gray-200">
					ለተጠቃሚ ምቹ የሰነዶች ፣ ደብዳቤ እና ፊርማ አስተዳደር ስርአት።
				</p>
			</div>
			<footer className="text-sm font-light text-gray-200">
				&copy; 2017 የኢኖቬሽን እና ቴክኖሎጂ ሚኒስቴር
			</footer>
		</section>
	);
}
