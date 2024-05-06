/** @format */

// video.d.ts
declare module "@editorjs/video" {
  export class Video {
    // ... constructor and methods (if applicable)
  }

  export function createVideo(
    url?: string,
    file?: File,
    config?: {
      // Optional configuration
      controls?: boolean; // Example: Show video controls
    }
  ): Video;
}
