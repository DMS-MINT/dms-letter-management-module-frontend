export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="card h-fit flex-1">{children}</main>;
}
