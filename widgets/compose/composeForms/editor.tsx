/** @format */
"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Configuration from "./configuration";
import { Pen } from "lucide-react";
import Draw from "./signatureDraw";
import { Button } from "@/components/ui/button";

const TextEditor = () => {
  const [showPage, setShowPage] = useState(false);

  const handleClick = () => {
    setShowPage((prevShowPage) => !prevShowPage); // Toggle the showPage state
  };
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    const initializeEditor = async () => {
      editorInstance.current = new EditorJS(Configuration());

      // Wait for the editor to be initialized
      await editorInstance.current.isReady;

      // Editor is ready
      console.log("Editor is ready");
    };

    initializeEditor();

    return () => {
      // Cleanup logic here if needed
    };
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">ደብዳቤ ለመጻፍ ቦታ</h1>
      <div id="editor" className="bg-white rounded shadow p-4">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outline" className="" onClick={handleClick}>
            <Pen />
          </Button>

          {showPage && <Draw />}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
