"use server";

import axiosInstance from "@/actions/axiosInstance";

export async function deleteParticipant(params: [string]) {
	try {
		const [participant_id] = params;
		await axiosInstance.delete(`participants/${participant_id}/delete/`);

		return { ok: true, message: "የተሳታፊው ፈቃዶች በተሳካ ሁኔታ ተወግደዋል።" };
	} catch (error: any) {
		return {
			ok: false,
			message: "በዚህ ጊዜ ፈቃዶችን ማስወገድ አልተቻለም። ችግሩ ከቀጠለ እባክዎ ድጋፍ ሰጪን ያነጋግሩ።",
		};
	}
}
