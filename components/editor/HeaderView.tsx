// extensions/HeaderNodeView.tsx
import { IMAGES } from "@/constants";
import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";

const HeaderNodeView = () => {
	return (
		<NodeViewWrapper className="header-node">
			<header className="flex items-center justify-center text-center text-black">
				<div className="inline-flex h-auto">
					<Image
						src={IMAGES.pentagram}
						alt="Ethiopian flag pentagon star symbol"
						width={103}
						height={120}
						className="m-0"
					/>
				</div>
				<div className="h-[120px] w-[406px]">
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
						width={160}
						height={120}
						className="m-0"
					/>
				</div>
			</header>
		</NodeViewWrapper>
	);
};

export default HeaderNodeView;
