"use client";

import { type Editor, EditorContent } from "@tiptap/react";

export default function Canvas({ editor }: { editor: Editor | null }) {
  return (
    <section className="py-4 bg-slate-100">
      <EditorContent
        style={{ whiteSpace: "pre-line" }}
        editor={editor}
        className="editor"
      />
    </section>
  );
}
