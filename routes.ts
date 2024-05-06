interface IRoute {
  name: string;
  path: string;
}

export type RouteArray = Array<IRoute>;

export const primaryRoutes: IRoute[] = [
  {
    name: "ገቢ ደብዳቤዎች",
    path: "/letters/inbox",
  },
  {
    name: "የተላኩ ደብዳቤዎች",
    path: "/letters/sent",
  },
  {
    name: "ረቂቆች",
    path: "/letters/draft",
  },
  {
    name: "ማህደር",
    path: "/letters/archive",
  },
  {
    name: "መጣያ",
    path: "/letters/trash",
  },
  {
    name: "ደብዳቤ መፃፊያ",
    path: "/compose",
  },
];
