"use client";

import { LetterComposeDrawer } from "@/components/drawers";
import { Drawer, Subheader } from "@/components/layouts";
import { ComposeControlPanel } from "@/components/panels";
import { OutgoingLetterTemplate } from "@/components/templates";
import type { LetterDetailType } from "@/types/letter_module";

export default function Compose() {
	const letter = {} as LetterDetailType;
	return (
		<>
			<Subheader>
				<ComposeControlPanel />
			</Subheader>
			<section className="flex h-fit gap-6 px-8">
				<Drawer>
					<LetterComposeDrawer />
				</Drawer>
				<main className="mb-0 flex flex-1 flex-col bg-gray-100">
					{letter ? <OutgoingLetterTemplate letter={letter} /> : null}
				</main>
			</section>
		</>
	);
}
