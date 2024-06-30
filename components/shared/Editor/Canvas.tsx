"use client";
import { type Editor, EditorContent } from "@tiptap/react";
import { useAppSelector } from "@/lib/hooks";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";

export default function Canvas({ editor }: { editor: Editor }) {
  const letterDetails = useAppSelector(selectLetterDetails);

  return (
    <section className="py-4 bg-slate-100">
      <div className="relative max-w-[210mm] min-h-[280mm] mx-auto">
        <EditorContent
          style={{ whiteSpace: "pre-line" }}
          editor={editor}
          className="editor"
        />
        {letterDetails?.signature ? (
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${letterDetails?.signature}`}
            className="bg-white mx-auto absolute w-80 bottom-1 right-1"
          />
        ) : null}
      </div>
    </section>
  );
}
