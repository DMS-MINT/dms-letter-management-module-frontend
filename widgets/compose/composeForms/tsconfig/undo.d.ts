/** @format */

// editorjs-undo.d.ts (tentative)

declare module "editorjs-undo" {
  export class Undo {
    constructor(options: { editor: any }); // Replace 'any' with Editor type if available
    undo(): void;
    redo(): void;
    // ... other methods (if applicable)
  }
}
