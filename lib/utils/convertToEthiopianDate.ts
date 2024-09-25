import { DateTime } from "luxon";

import { hourTranslations, monthTranslations } from "@/types/letter_module";
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

	const dt = DateTime.fromJSDate(date);
	const localTime = dt.setZone("Africa/Addis_Ababa");
	const hour = Number(localTime.toFormat("hh"));
	const minute = localTime.toFormat("mm");
	const dayPeriod: "AM" | "PM" = localTime.toFormat("a") as "AM" | "PM";

	return {
		time: `${hourTranslations[hour][dayPeriod]}:${minute}`,
		date: `${monthTranslations[ethMonth]} ${ethDay}, ${ethYear}`,
	};
}
