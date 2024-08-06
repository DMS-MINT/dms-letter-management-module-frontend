import { monthTranslations } from "@/types/letter_module";
const ethiopianDate = require("ethiopian-date");

export function convertToEthiopianDateonly(dateString: string): string {
	const date = new Date(dateString);

	const [ethYear, ethMonth, ethDay] = ethiopianDate.toEthiopian(
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate()
	);

	return `${monthTranslations[ethMonth]} ${ethDay} ${ethYear}`;
}

export default function convertToEthiopianDate(dateString: string): {
	time: string;
	date: string;
} {
	const date = new Date(dateString);

	const [ethYear, ethMonth, ethDay] = ethiopianDate.toEthiopian(
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate()
	);

	// Formatting the time component
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	// const seconds = date.getSeconds().toString().padStart(2, "0");

	// Return an object with separate parts
	return {
		time: `${hours}:${minutes}`,
		date: `${monthTranslations[ethMonth]} ${ethDay}, ${ethYear}`,
	};
}
