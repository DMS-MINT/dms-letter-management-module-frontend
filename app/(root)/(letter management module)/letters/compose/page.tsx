"use client";

import { LetterComposeDrawer } from "@/components/drawers";
import { Drawer, Subheader } from "@/components/layouts";
import { ComposeControlPanel } from "@/components/panels";
import {
	IncomingLetterTemplate,
	InternalLetterTemplate,
	OutgoingLetterTemplate,
} from "@/components/templates";
import { useLetterStore } from "@/stores";
import { useEffect } from "react";

export default function Compose() {
	const { letter_type, resetContent } = useLetterStore((state) => ({
		letter_type: state.letter_type,
		resetContent: state.resetContent,
	}));

	useEffect(() => {
		resetContent();
	}, [resetContent]);

	const renderTemplate = () => {
		switch (letter_type) {
			case "internal":
				return <InternalLetterTemplate />;
			case "outgoing":
				return <OutgoingLetterTemplate />;
			case "incoming":
				return <IncomingLetterTemplate />;
			default:
				return null;
		}
	};

	return (
		<>
			<Subheader>
				<ComposeControlPanel />
			</Subheader>
			<section className="flex h-fit gap-6 pl-8 pr-5">
				<Drawer>
					<LetterComposeDrawer />
				</Drawer>
				<main className="mb-0 flex flex-1 flex-col items-center bg-gray-100 py-5">
					{renderTemplate()}
				</main>
			</section>
		</>
	);
}
