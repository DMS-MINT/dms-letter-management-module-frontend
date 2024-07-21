import "@/app/globals.css";
import { MINT_Logo } from "@/constants";
import Image from "next/image";

export default function BrandingSection() {
	return (
		<section className="bg-gradient px-14 pt-20 pb-14 flex flex-col justify-between">
			<div>
				<Image src={MINT_Logo} alt="logo" width={60} height={60} />
				<h2 className="text-white font-medium text-xl mt-5 mb-2">
					የሰነድ አስተዳደር እና ኢ-ፊርማ
				</h2>
				<p className="text-gray-200 font-light text-sm">
					ጥረት የለሽ ሰነድ እና የደብዳቤ አስተዳደር፣ እንከን የለሽ ፊርማዎች።
				</p>
			</div>
			<div className="flex gap-2 items-end">
				<p className="text-gray-200">በኢኖቬሽን እና ቴክኖሎጂ ሚኒስቴር በኩራት የተደገፈ</p>
				<Image src={MINT_Logo} alt="logo" width={30} height={60} />
			</div>
		</section>
	);
}
