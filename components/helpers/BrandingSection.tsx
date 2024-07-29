import { IMAGES } from "@/constants";
import Image from "next/image";

export default function BrandingSection() {
	return (
		<section className="flex flex-col justify-between bg-gradient px-14 pb-14 pt-20">
			<div>
				<Image
					src={IMAGES.mint}
					alt="Ministry of Innovation and Technology logo"
					width={80}
					height={80}
				/>

				<h2 className="mb-2 mt-5 text-xl font-medium text-white">
					የሰነድ አስተዳደር እና ኢ-ፊርማ
				</h2>
				<p className="text-sm font-light text-gray-200">
					ጥረት የለሽ ሰነድ እና የደብዳቤ አስተዳደር፣ እንከን የለሽ ፊርማዎች።
				</p>
			</div>
			<div className="flex items-end gap-2">
				<p className="text-gray-200">በኢኖቬሽን እና ቴክኖሎጂ ሚኒስቴር በኩራት የተደገፈ</p>
				<Image
					src={IMAGES.mint_logo}
					alt="Ministry of Innovation and Technology logo"
					width={30}
					height={60}
					priority
				/>
			</div>
		</section>
	);
}
