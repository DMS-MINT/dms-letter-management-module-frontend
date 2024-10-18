import { IMAGES } from "@/constants";
import Image from "next/image";

export default function BrandingSection() {
	return (
		<section className="flex flex-col justify-between bg-brand-gradient px-14 pb-14 pt-20">
			<div>
				<Image
					src={IMAGES.mint}
					alt="Ministry of Innovation and Technology logo"
					width={110}
					height={120}
				/>

				<h2 className="mb-2 mt-5 text-xl font-medium text-white">
					የሰነድ አስተዳደር እና ኢ-ፊርማ
				</h2>
				<p className="text-sm font-light text-gray-200">
					ለተጠቃሚ ምቹ ሰነዶች ፣ የደብዳቤ አስተዳደር እና ፊርማዎች።
				</p>
			</div>
		</section>
	);
}
