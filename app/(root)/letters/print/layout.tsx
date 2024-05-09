import { Subheader } from "@/components/layouts";
import { ControlPanel } from "@/widgets/print";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Subheader>
        <ControlPanel />
      </Subheader>
      <section className="flex py-12 gap-6 mt-2 h-fit bg-gray-200 justify-center">
        {children}
      </section>
    </>
  );
}
