import { Card } from "@/components/ui/card";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1">
      <Card className="p-6 h-full">{children}</Card>
    </main>
  );
}
