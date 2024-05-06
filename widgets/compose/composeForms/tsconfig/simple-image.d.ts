
// simple-image.d.ts
declare module '@editorjs/simple-image' {
    export class SimpleImage {
      // ... constructor and methods (if applicable)
    }
  
    export function createSimpleImage(url?: string, file?: File): SimpleImage; // Optional: URL or file for image
  }
  