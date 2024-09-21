import { DateTime } from "luxon";

import { monthTranslations } from "@/types/letter_module";
const ethiopianDate = require("ethiopian-date");

export function convertToEthiopianDate(dateString: string): string {
	const date = new Date(dateString);

	const [ethYear, ethMonth, ethDay] = ethiopianDate.toEthiopian(
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate()
	);

	return `${monthTranslations[ethMonth]} ${ethDay} ${ethYear}`;
}

export function convertToEthiopianDateAndTime(dateString: string): {
	time: string;
	date: string;
} {
	const date = new Date(dateString);

	const [ethYear, ethMonth, ethDay] = ethiopianDate.toEthiopian(
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate()
	);

	// const hours = date.getHours();
	// const minutes = date.getMinutes().toString().padStart(2, "0");

	const dt = DateTime.fromJSDate(date);
	const localTime = dt.setZone("Africa/Addis_Ababa").toFormat("hh:mm a");

	return {
		time: `${localTime}`,
		date: `${monthTranslations[ethMonth]} ${ethDay}, ${ethYear}`,
	};
}
