"use client";

import { Badge } from "@/components/ui/badge";
import { Mail, Paperclip } from "lucide-react";

export default function LetterComposeDrawer() {
	return (
		<section className="flex flex-col gap-10">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<Mail size={20} className="text-gray-600" />
					<p className="text-gray-600">የደብዳቤ አይነት</p>
				</div>
				<Badge className="mb-2 h-10 rounded-sm bg-gray-200 text-base font-normal text-gray-900"></Badge>
				<div className="flex items-center gap-2">
					<Paperclip size={20} className="text-gray-600" />
					<p className="text-gray-600">የተያያዙ ፋይሎች</p>
				</div>
				<Badge className="mb-2 h-10 rounded-sm bg-gray-200 text-base font-normal text-gray-900"></Badge>
			</div>
		</section>
	);
}
