import { Subheader, Drawer, Main } from "@/components/layouts";
import { ControlPanel } from "@/widgets/compose";
import { NavigationPanel } from "@/widgets/common";

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
      <section className="flex px-8 gap-6 mt-2 h-fit">
        <Drawer>
          <NavigationPanel />
        </Drawer>
        <Main>{children}</Main>
      </section>
    </>
  );
}
