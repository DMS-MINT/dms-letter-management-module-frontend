/** @format */

import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import React from "react";
import { EditorConfig, ToolConstructable } from "@editorjs/editorjs";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

// import Undo from "editorjs-undo";

// Rest of your code

const Configuration = (): EditorConfig => {
  return {
    holder: "editor",
    tools: {
      header: {
        class: Header as unknown as ToolConstructable,
        inlineToolbar: true,
      },
      paragraph: {
        class: Paragraph as unknown as ToolConstructable,
        inlineToolbar: true,
        config: {},
      },

      list: {
        class: List as unknown as ToolConstructable,
        inlineToolbar: true,
      },
      table: {
        class: Table as unknown as ToolConstructable,
        inlineToolbar: true,
      },
      inlineCode: {
        class: InlineCode as unknown as ToolConstructable,
      },
      image: {
        class: SimpleImage as unknown as ToolConstructable,
        inlineToolbar: true,
      },

      // undo: {
      //   class: Undo as unknown as ToolConstructable,
      // },
    },
    data: {
      blocks: [],
    },
    onReady: () => {
      console.log("Editor is ready");
    },

    onChange: (api, event) => {
      console.log("Editor content changed");
    },
  };
};

export default Configuration;
