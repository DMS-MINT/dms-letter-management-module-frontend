"use client";

import { Drawer, Subheader } from "@/components/layouts";
import {
	ComposeControlPanel,
	LetterComposeDrawer,
} from "@/components/letter_module";
import { OutgoingLetterTemplate } from "@/components/letter_module/templates";
import { LetterDetailType } from "@/types/letter_module";

export default function Compose() {
	const letter = {} as LetterDetailType;
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
					{true ? <OutgoingLetterTemplate letter={letter} /> : null}
				</main>
			</section>
		</>
	);
}
