"use client";

import { Subheader, Drawer, Main } from "@/components/layouts";
import { DataTable } from "@/components/shared/tableComponents";
import { useAppSelector } from "@/lib/hooks";
import { selectLetters } from "@/lib/features/letter/letterSlice";
import { useParams } from "next/navigation";
import {
  archiveTableColumns,
  draftTableColumns,
  inboxTableColumns,
  outboxTableColumns,
  trashTableColumns,
} from "@/components/features/letter/config";
import { useEffect, useState } from "react";
import { ILetterListInputSerializer } from "@/typing";
import { ColumnDef } from "@tanstack/react-table";
import {
  LetterNavigationDrawer,
  TableControlPanel,
} from "@/components/features/letter";

export default function ClerkInboxTable() {
  const letters = useAppSelector(selectLetters);
  const params = useParams();
  const [columns, setColumns] = useState<
    ColumnDef<ILetterListInputSerializer>[]
  >([]);

  useEffect(() => {
    switch (params.category) {
      case "archive":
        setColumns(archiveTableColumns);
        break;
      case "draft":
        setColumns(draftTableColumns);
        break;
      case "inbox":
        setColumns(inboxTableColumns);
        break;
      case "outbox":
        setColumns(outboxTableColumns);
        break;
      case "trash":
        setColumns(trashTableColumns);
        break;
      default:
        break;
    }
  }, [params]);

  return (
    <>
      <Subheader>
        <TableControlPanel />
      </Subheader>
      <section className="flex flex-1 pb-3 px-8 gap-6 mt-2">
        <Drawer>
          <LetterNavigationDrawer />
        </Drawer>
        <Main>
          <DataTable columns={columns} data={letters} />
        </Main>
      </section>
    </>
  );
}
