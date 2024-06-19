"use client";

import {
  selectLetterDetails,
  updateContent,
} from "@/lib/features/letter/letterSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/lib/hooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor() {
  const letterDetail = useAppSelector(selectLetterDetails);
  const dispatch = useAppDispatch();

  const stripHTMLTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, "");
  };

  const handleChange = (html: string) => {
    const plaintext = stripHTMLTags(html);
    dispatch(updateContent(plaintext));
  };

  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strikethrough"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
    [{ font: [] }, { color: [] }],
    ["superscript", "subscript"],
    ["undo", "redo"],
  ];

  return (
    <div className="bg-gray-100 p-1 h-fit flex">
      <ReactQuill
        theme="snow"
        value={letterDetail.content || ""}
        onChange={handleChange}
        modules={{ toolbar: toolbarOptions }}
        className="w-[732px] min-h-[30em] mx-auto bg-white"
      />
    </div>
  );
}
