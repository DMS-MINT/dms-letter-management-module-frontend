"use client";

import { Button } from "@/components/ui/button";
import { letterCategoryLookup } from "@/typing/dictionary";
import { Plus, RotateCw } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const whitelist: string[] = ["inbox", "outbox", "draft", "archive", "trash"];

export default function TableControlPanel() {
  const params = useParams();
  const router = useRouter();
  const category: string = params.category as string;

  useEffect(() => {
    if (!whitelist.includes(params.category as string)) {
      router.push("/404");
    }
  }, [params.category]);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <section className="flex items-center justify-between w-full no-print">
      <h1 className="page-title">
        {letterCategoryLookup[category.toUpperCase()]}
      </h1>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={refreshPage}>
          <RotateCw className="w-5 h-5" />
        </Button>
        <Link href="/letters/compose">
          <Button className="flex gap-1 w-fit items-center">
            <Plus size={19} />
            አዲስ ደብዳቤ
          </Button>
        </Link>
      </div>
    </section>
  );
}
