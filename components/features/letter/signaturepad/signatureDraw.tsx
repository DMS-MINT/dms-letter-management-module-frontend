import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pen, Eraser, Undo, RefreshCw, FileSignature } from "lucide-react";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [lastX, setLastX] = useState<number | null>(null);
  const [lastY, setLastY] = useState<number | null>(null);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [strokeColor, setStrokeColor] = useState("#000000");

  const toggleCanvasVisibility = () => {
    setIsCanvasVisible((prevState) => !prevState);
  };

  const handleEraserClick = () => {
    setEraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
  };

  const handleClearClick = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    }
  };

  const handleUndoClick = () => {
    // Implement undo logic if needed
  };

  const handleCanvasMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        setDrawing(true);
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        setLastX(x);
        setLastY(y);
        context.beginPath();
        context.moveTo(x, y);
      }
    }
  };

  const handleCanvasMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (drawing && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        context.lineTo(x, y);
        context.strokeStyle = eraseMode ? "#ffffff" : strokeColor;
        context.lineWidth = strokeWidth;
        context.stroke();
        setLastX(x);
        setLastY(y);
      }
    }
  };

  const handleCanvasMouseUp = () => {
    setDrawing(false);
  };

  const handleStrokeWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStrokeWidth(Number(event.target.value));
  };

  const handleAddClick = () => {
    if (canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "canvas-image.png", {
            type: "image/png",
          });
          console.log(file);
        }
      }, "image/png");
    }
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
              <Button
                variant="outline"
                type="button"
                className="btn btn-sm btn-outline-primary ml-2 mr-2"
                onClick={handleAddClick}
              >
                Add
              </Button>
            </div>

            <canvas
              ref={canvasRef}
              style={{ border: "1px solid #000000", marginTop: "10px" }}
              width={400}
              height={300}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseOut={handleCanvasMouseUp}
            ></canvas>
          </>
        )}
      </div>
    </main>
  );
}
