declare module "ethiopian-date" {
  function toEthiopian(
    year: number,
    month: number,
    day: number
  ): [number, number, number];
  function toGregorian(
    year: number,
    month: number,
    day: number
  ): [number, number, number];

  export { toEthiopian, toGregorian };
}
