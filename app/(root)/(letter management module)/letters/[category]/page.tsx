"use client";

import { Subheader, Drawer, Main } from "@/components/layouts";
import { DataTable } from "@/components/shared/tableComponents";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getLetters, selectLetters } from "@/lib/features/letter/letterSlice";
import { useParams } from "next/navigation";
import {
  archiveTableColumns,
  draftTableColumns,
  inboxTableColumns,
  outboxTableColumns,
  trashTableColumns,
} from "@/components/features/letter/config";
import { useEffect, useState } from "react";
import { ILetterListInputSerializer } from "@/typing/interface";
import { ColumnDef } from "@tanstack/react-table";
import {
  LetterNavigationDrawer,
  TableControlPanel,
} from "@/components/features/letter";

export default function Table() {
  const letters: ILetterListInputSerializer[] = useAppSelector(selectLetters);
  const params = useParams();
  const [columns, setColumns] = useState<
    ColumnDef<ILetterListInputSerializer>[]
  >([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (params.category) {
      case "archive":
        setColumns(archiveTableColumns);
        dispatch(getLetters("archive"));
        break;
      case "draft":
        setColumns(draftTableColumns);
        dispatch(getLetters("draft"));
        break;
      case "inbox":
        setColumns(inboxTableColumns);
        dispatch(getLetters("inbox"));
        break;
      case "outbox":
        setColumns(outboxTableColumns);
        dispatch(getLetters("outbox"));
        break;
      case "trash":
        setColumns(trashTableColumns);
        dispatch(getLetters("trash"));
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
