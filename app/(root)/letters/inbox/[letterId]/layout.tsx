import { Subheader, Drawer } from "@/components/layouts";
import { LetterTypeEnum } from "@/typing/enum";
import { Aside, ControlPanel } from "@/widgets/inbox/detail";

export default function RootLayout({
  internal,
  outgoing,
  incoming,
}: Readonly<{
  children: React.ReactNode;
  internal: React.ReactNode;
  outgoing: React.ReactNode;
  incoming: React.ReactNode;
}>) {
  const letterType: LetterTypeEnum = LetterTypeEnum.OUTGOING;

  const main: React.ReactNode =
    letterType.valueOf() == LetterTypeEnum.INTERNAL.valueOf()
      ? internal
      : letterType.valueOf() == LetterTypeEnum.OUTGOING.valueOf()
        ? outgoing
        : incoming;

  return (
    <>
      <Subheader>
        <ControlPanel />
      </Subheader>
      <section className="flex px-8 gap-6 mt-2 h-full">
        <Drawer>
          <Aside />
        </Drawer>
        {main}
      </section>
    </>
  );
}
