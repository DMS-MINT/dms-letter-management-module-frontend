"use client";

import { Subheader, Drawer, Main } from "@/components/layouts";
import { DataTable } from "@/components/shared/tableComponents";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getLetters, selectLetters } from "@/lib/features/letter/letterSlice";
import { useParams } from "next/navigation";
import {
  pendingTableColumns,
  draftTableColumns,
  inboxTableColumns,
  outboxTableColumns,
  publishedTableColumns,
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
      case "inbox":
        setColumns(inboxTableColumns);
        dispatch(getLetters("inbox"));
        break;
      case "outbox":
        setColumns(outboxTableColumns);
        dispatch(getLetters("outbox"));
        break;
      case "draft":
        setColumns(draftTableColumns);
        dispatch(getLetters("draft"));
        break;
      case "trash":
        setColumns(trashTableColumns);
        dispatch(getLetters("trash"));
        break;
      case "pending":
        setColumns(pendingTableColumns);
        dispatch(getLetters("pending"));
        break;
      case "published":
        setColumns(publishedTableColumns);
        dispatch(getLetters("published"));
        break;
      default:
        break;
    }
  }, [params]);

  const removeDuplicates = (letters: ILetterListInputSerializer[]) => {
    if (!letters) {
      return [];
    }

    const uniqueLetters = letters.reduce<{
      [key: string]: ILetterListInputSerializer;
    }>((acc, letter) => {
      acc[letter.id] = letter;
      return acc;
    }, {});
    return Object.values(uniqueLetters);
  };

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
          <DataTable columns={columns} data={removeDuplicates(letters)} />
        </Main>
      </section>
    </>
  );
}
