"use client";

import { Button } from "@/components/ui/button";
import { letterCategoryLookup } from "@/typing/dictionary";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const whitelist: string[] = ["inbox", "outbox", "draft", "pending", "published"];

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
    <section className="flex items-center justify-between w-full">
      <h1 className="page-title">
        {letterCategoryLookup[category.toUpperCase()]}
      </h1>
      <div className="flex items-center gap-4">
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
