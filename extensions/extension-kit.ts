"use client";

import { Placeholder, StarterKit } from ".";

export const ExtensionKit = () => [
	StarterKit,
	Placeholder.configure({
		placeholder: "ደብዳቤዎን እዚህ ይፃፉ...",
	}),
];
