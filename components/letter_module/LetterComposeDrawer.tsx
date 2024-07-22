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
				<Badge className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal mb-2"></Badge>
				<div className="flex items-center gap-2">
					<Paperclip size={20} className="text-gray-600" />
					<p className="text-gray-600">የተያያዙ ፋይሎች</p>
				</div>
				<Badge className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal mb-2"></Badge>
			</div>
		</section>
	);
}
