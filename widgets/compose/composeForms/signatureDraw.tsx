/** @format */

import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { type ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function App() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);

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
  return (
    <div className=" flex-column ml-3 mb-3 mr-3  p-2">
      <h1 className="mx-2 my-2">መሳሪያዎች</h1>

      <div className="flex align-items-center ">
        <Button
          variant="outline"
          type="button"
          className="btn btn-sm btn-outline-primary ml-3 mb-3  px-3 py-2 mr-3"
          disabled={!eraseMode}
          onClick={handlePenClick}
        >
          ብዕር
        </Button>
        <Button
          variant="outline"
          type="button"
          className="btn btn-sm btn-outline-primary ml-3 mb-3 mr-3 px-3 py-2 "
          disabled={eraseMode}
          onClick={handleEraserClick}
        >
          ማጥፊያ
        </Button>

        <div className="vr" />
        <Button
          variant="outline"
          type="button"
          className="btn btn-sm btn-outline-primary  mb-3 ml-2 mr-2"
          onClick={handleUndoClick}
        >
          ቀልብስ
        </Button>
        <Button
          variant="outline"
          type="button"
          className="btn btn-sm btn-outline-primary mb-3 ml-2 mr-2"
          onClick={handleRedoClick}
        >
          ድገም
        </Button>
        <Button
          variant="outline"
          type="button"
          className="btn btn-sm btn-outline-primary ml-2 mr-2"
          onClick={handleClearClick}
        >
          አጽዳው።
        </Button>
        <Button
          variant="outline"
          type="button"
          className="btn btn-sm btn-outline-primary ml-2 mr-2"
          onClick={handleResetClick}
        >
          ዳግም አስጀምር
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
      </div>

      <h1>ሸራ</h1>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={strokeWidth}
        eraserWidth={eraserWidth}
        strokeColor={strokeColor}
        canvasColor={canvasColor}
      />
    </div>
  );
}
