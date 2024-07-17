"use client";

import {
	ComposeControlPanel,
	LetterComposeDrawer,
} from "@/components/features/letter";
import { Drawer, Main, Subheader } from "@/components/layouts";
import { OutgoingLetterTemplate } from "@/components/templates";

export default function Compose() {
	return (
		<>
			<Subheader>
				<ComposeControlPanel />
			</Subheader>
			<section className="flex px-8 gap-6 h-fit">
				<Drawer>
					<LetterComposeDrawer />
				</Drawer>
				<main className="mb-0 flex-1 flex flex-col bg-gray-100">
					<div className="h-10 sticky top-0 bg-gray-100"></div>
					{true ? <OutgoingLetterTemplate /> : null}
				</main>
			</section>
		</>
	);
}
