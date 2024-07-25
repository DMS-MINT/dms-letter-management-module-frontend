import { monthTranslations } from "@/types/letter_module";
const ethiopianDate = require("ethiopian-date");

export default function convertToEthiopianDate(dateString: string): string {
	const date = new Date(dateString);

	const [ethYear, ethMonth, ethDay] = ethiopianDate.toEthiopian(
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate()
	);

	return `${monthTranslations[ethMonth]} ${ethDay} ${ethYear}`;
}
