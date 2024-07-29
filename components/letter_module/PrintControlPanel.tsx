"use client";

import { Button } from "@/components/ui/button";
import { FileText, NotepadText, Printer, RotateCw } from "lucide-react";
import Link from "next/link";

export default function PrintControlPanel() {
	function refreshPage() {
		window.location.reload();
	}

	return (
		<section className="flex w-full items-center justify-between">
			<h1 className="page-title">
				የሩሲያ ፌዴሬሽን ባዘጋጀው የዕውቅና ሽልማት ላይ ተሳትፎ እንዲደረግ ስለማሳወቅ
			</h1>
			<div className="flex items-center gap-4">
				<Button variant="outline" className="v flex w-fit items-center gap-1">
					<FileText />
					PDF
				</Button>
				<Button variant="outline" size="icon" onClick={refreshPage}>
					<RotateCw className="h-5 w-5" />
				</Button>
				<Button variant="outline" size="icon" onClick={refreshPage}>
					<NotepadText className="h-5 w-5" />
				</Button>
				<Link href="/compose">
					<Button className="flex w-fit items-center gap-1">
						<Printer />
						አትም
					</Button>
				</Link>
			</div>
		</section>
	);
}
