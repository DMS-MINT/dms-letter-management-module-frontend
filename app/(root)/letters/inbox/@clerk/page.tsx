import { Subheader, Drawer, Main } from "@/components/layouts";
import { ControlPanel } from "@/widgets/inbox";
import { NavigationPanel } from "@/widgets/common";
import { columns } from "./columns";
import { DataTable } from "@/components/dataTable";
import { ILetterListInputSerializer } from "@/typing";

export default async function ClerkInboxTable({
  letters,
}: {
  letters: ILetterListInputSerializer[];
}) {
  return (
    <>
      <Subheader>
        <ControlPanel />
      </Subheader>
      <section className="flex flex-1 pb-3 px-8 gap-6 mt-2">
        <Drawer>
          <NavigationPanel />
        </Drawer>
        <Main>
          <DataTable columns={columns} data={letters} />
        </Main>
      </section>
    </>
  );
}
