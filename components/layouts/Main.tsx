export default function Main({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <main className={`card h-fit flex-1 ${className}`}>{children}</main>;
}
