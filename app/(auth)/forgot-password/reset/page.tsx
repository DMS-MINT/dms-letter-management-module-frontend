import { BrandingSection } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Reset() {
	return (
		<main className="grid h-full grid-cols-2">
			<BrandingSection />
			<section className="flex flex-col justify-center gap-7 px-24">
				<div>
					<h2 className="mb-2 mt-5 text-xl font-medium text-gray-900">
						የይለፍ ቃሎን ይቀይሩ።
					</h2>
					<p className="text-sm font-light text-gray-700">
						እባክዎ የይለፍ ቃልዎ ጠንካራ እና ደህንነቱ የተጠበቀ መሆኑን ያረጋግጡ።
					</p>
				</div>
				<form className="flex flex-col gap-5 ">
					<div className="grid items-center gap-1.5">
						<Label htmlFor="የላኪ ፖስታ ቁጥር">አዲስ የይለፍ ቃል ያስገቡ</Label>
						<Input type="text" id="የላኪ ፖስታ ቁጥር" />
						<div className="my-3 ml-5">
							<ul className="list-disc text-sm font-light text-gray-700">
								<li> የይለፍ ቃልህ ከሌላ የግል መረጃህ ጋር በጣም ተመሳሳይ ሊሆን አይችልም።</li>
								<li> የይለፍ ቃልዎ ቢያንስ 8 ቁምፊዎችን መያዝ አለበት።</li>
								<li> የይለፍ ቃልዎ ቢያንስ አንድ አቢይ ሆሄ መያዝ አለበት።</li>
								<li> የይለፍ ቃልዎ ቢያንስ አንድ የቁጥር እሴት መያዝ አለበት።</li>
								<li> የይለፍ ቃልዎ ቢያንስ አንድ ልዩ ቁምፊ (@, #,$,%) መያዝ አለበት።</li>
							</ul>
						</div>
					</div>
					<div className="grid items-center gap-1.5">
						<Label htmlFor="የላኪ ፖስታ ቁጥር">አዲሱን የይለፍ ቃልዎን ያረጋግጡ</Label>
						<Input type="text" id="የላኪ ፖስታ ቁጥር" />
					</div>
					<Link href="/letters/inbox">
						<Button variant="secondary" className="w-full">
							ጨርስ
						</Button>
					</Link>
				</form>
			</section>
		</main>
	);
}
