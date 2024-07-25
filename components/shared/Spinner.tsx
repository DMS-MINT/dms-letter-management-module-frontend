"use client";

import { MutatingDots } from "react-loader-spinner";

export default function Spinner() {
	return (
		<MutatingDots
			visible={true}
			height="100"
			width="100"
			color="#2563eb"
			secondaryColor="#3b82f6"
			radius="12.5"
			ariaLabel="mutating-dots-loading"
			wrapperStyle={{}}
			wrapperClass=""
		/>
	);
}
