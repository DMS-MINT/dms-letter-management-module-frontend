import { toEthiopian } from "ethiopian-date";
export enum EthiopianMonths {
  መስከረም = 1,
  ጥቅምት = 2,
  ህዳር = 3,
  ታህሳስ = 4,
  ጥር = 5,
  የካቲት = 6,
  መጋቢት = 7,
  ሚያዝያ = 8,
  ግንቦት = 9,
  ሰኔ = 10,
  ሐምሌ = 11,
  ነሐሴ = 12,
  ጳጉሜ = 13,
}

export const formatEthiopianDate = (dateString: string): string => {
  const date = new Date(dateString);
  const [ethYear, ethMonth, ethDay] = toEthiopian(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  // Ensure ethMonth is within valid range (1 to 13 for Ethiopian calendar)
  const ethMonthName =
    ethMonth >= 1 && ethMonth <= 13
      ? EthiopianMonths[ethMonth as unknown as keyof typeof EthiopianMonths]
      : "";

  return ` ${ethMonthName} ${ethDay}  ${ethYear}`;
};
