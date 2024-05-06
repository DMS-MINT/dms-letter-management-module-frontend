import { Subheader, Drawer } from "@/components/layouts";
import { Aside, ControlPanel } from "@/widgets/inbox/detail";

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
      <section className="flex px-8 gap-6 mt-2 h-full">
        <Drawer>
          <Aside />
        </Drawer>
        {children}
      </section>
    </>
  );
}
