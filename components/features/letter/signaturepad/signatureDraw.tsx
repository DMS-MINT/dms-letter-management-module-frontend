/** @format */

import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { type ChangeEvent, useRef, useState } from "react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Eraser,
  Pen,
  RefreshCw,
  Undo,
  Save,
  FileSignature,
} from "lucide-react";

export default function App() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(+event.target.value);
  };

  const handleEraserWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEraserWidth(+event.target.value);
  };

  const [strokeColor, setStrokeColor] = useState("#000000");
  const [canvasColor, setCanvasColor] = useState("#ffffff");

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  const handleResetClick = () => {
    canvasRef.current?.resetCanvas();
  };

  const handleExport = async () => {
    if (canvasRef.current) {
      try {
        const dataURL = await canvasRef.current.exportImage("png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "sketch.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Failed to export image", error);
      }
    }
  };

  const toggleCanvasVisibility = () => {
    setIsCanvasVisible((prevState) => !prevState);
  };

  return (
    <main>
      <div className="flex-column ml-3 mb-3 mr-3 p-2">
        <h1 className="mx-2 my-2">የ ፊርማ ቦታ</h1>

        <Button
          variant="outline"
          type="button"
          className="btn btn-sm btn-outline-primary ml-3 mb-3 px-3 py-2 mr-3"
          onClick={toggleCanvasVisibility}
        >
          <FileSignature />
        </Button>

        {isCanvasVisible && (
          <>
            <div className="flex align-items-center">
              <Button
                variant="outline"
                type="button"
                className="btn btn-sm btn-outline-primary ml-3 mb-3 px-3 py-2 mr-3"
                disabled={!eraseMode}
                onClick={handlePenClick}
              >
                <Pen />
              </Button>
              <Button
                variant="outline"
                type="button"
                className="btn btn-sm btn-outline-primary ml-3 mb-3 mr-3 px-3 py-2"
                disabled={eraseMode}
                onClick={handleEraserClick}
              >
                <Eraser />
              </Button>

              <div className="vr" />
              <Button
                variant="outline"
                type="button"
                className="btn btn-sm btn-outline-primary mb-3 ml-2 mr-2"
                onClick={handleUndoClick}
              >
                <Undo />
              </Button>

              <Button
                variant="outline"
                type="button"
                className="btn btn-sm btn-outline-primary ml-2 mr-2"
                onClick={handleClearClick}
              >
                <RefreshCw />
              </Button>

              <label htmlFor="strokeWidth" className="form-label">
                Stroke width
              </label>
              <input
                disabled={eraseMode}
                type="range"
                className="form-range ml-3 mr-3 px-3"
                min="1"
                max="20"
                step="1"
                id="strokeWidth"
                value={strokeWidth}
                onChange={handleStrokeWidthChange}
              />
              <label htmlFor="eraserWidth" className="form-label ml-3 mr-3">
                ማጥፊያ ስፋት
              </label>
              <input
                disabled={!eraseMode}
                type="range"
                className="form-range ml-3 mr-3 px-3"
                min="1"
                max="20"
                step="1"
                id="eraserWidth"
                value={eraserWidth}
                onChange={handleEraserWidthChange}
              />
              <Button
                variant="outline"
                type="button"
                className="btn btn-sm btn-outline-primary ml-2 mr-2"
                onClick={handleExport}
              >
                <Save />
              </Button>
            </div>

            <ReactSketchCanvas
              ref={canvasRef}
              strokeWidth={strokeWidth}
              eraserWidth={eraserWidth}
              strokeColor={strokeColor}
              canvasColor={canvasColor}
            />
          </>
        )}
      </div>
    </main>
  );
}
