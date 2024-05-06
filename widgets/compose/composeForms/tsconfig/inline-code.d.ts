
// inline-code.d.ts
declare module '@editorjs/inline-code' {
    export class InlineCode {
      // ... constructor and methods (if applicable)
    }
  
    export function createInlineCode(options?: { // Optional: Configuration options
      textStyle?: string; // Example: 'bold' or 'italic'
    }): InlineCode;
  }