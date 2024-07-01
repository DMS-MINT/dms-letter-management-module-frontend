export default function Main({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <main className={`card h-fit flex-1 min-w-0 ${className}`}>{children}</main>
  );
}
