import React from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import { useAppSelector } from "@/lib/hooks";
import {
  selectLetterDetails,
  updateContent,
} from "@/lib/features/letter/letterSlice";
import { useDispatch } from "react-redux";

export default function RichTextEditor() {
  const letterDetail = useAppSelector(selectLetterDetails);
  const dispatch = useDispatch();

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: letterDetail.content ? letterDetail.content : "",
    editorProps: {
      attributes: {
        class:
          "max-w-[210mm] min-h-[297mm] p-[2.5rem] mx-auto bg-white border border-gray-300",
      },
    },
    onUpdate: ({ editor }) => dispatch(updateContent(editor.getHTML())),
  });

  return (
    <section className="border border-gray-300">
      <Toolbar editor={editor} />
      <Canvas editor={editor} />
    </section>
  );
}
