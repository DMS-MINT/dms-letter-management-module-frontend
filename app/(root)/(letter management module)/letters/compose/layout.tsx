/** @format */


import {
  ComposeControlPanel,
  LetterNavigationDrawer,
} from "@/components/features/letter";
import { Subheader, Drawer, Main } from "@/components/layouts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Subheader>
        <ComposeControlPanel />
      </Subheader>
      <section className='flex px-8  gap-6 mt-2 h-fit'>
        <Drawer>
          <LetterNavigationDrawer />
        </Drawer>
        <Main className='mb-10'>{children}</Main>
      </section>
    </>
  );
}
