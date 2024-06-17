/** @format */

import {
  DetailControlPanel,
  LetterDetailsDrawer,
} from "@/components/features/letter";
import { Subheader, Drawer } from "@/components/layouts";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Subheader>
        <section className='flex items-center justify-between w-full no-print'>
          <DetailControlPanel />
        </section>
      </Subheader>
      <section className='flex px-8 gap-6 mt-2 h-full'>
        <Drawer>
          <LetterDetailsDrawer />
        </Drawer>
        {children}
      </section>
    </>
  );
}
