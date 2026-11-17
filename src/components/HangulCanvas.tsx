import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';
import { AudioButton } from './AudioButton';

interface HangulCanvasProps {
  targetCharacter: string;
  romanization: string;
  english: string;
  strokeHint?: string;
}

export const HangulCanvas: React.FC<HangulCanvasProps> = ({
  targetCharacter,
  romanization,
  english,
  strokeHint,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [canvasSize, setCanvasSize] = useState(260);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const target = Math.min(Math.max(width - 24, 200), 300);
        setCanvasSize(target);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    clearCanvas();
  }, [targetCharacter, canvasSize]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.setLineDash([]);
    setHasDrawn(false);
  };

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl border-2 border-stone-200 p-4 sm:p-5 shadow-xs space-y-3.5 flex flex-col justify-between w-full"
    >
      <div className="flex items-start justify-between border-b border-stone-100 pb-2.5 gap-2">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 block">
            Writing & Stroke Practice
          </span>
          <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2 mt-0.5">
            Trace <span className="font-hangul text-2xl sm:text-3xl text-amber-600">{targetCharacter}</span>
            <AudioButton text={targetCharacter} size="sm" />
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-500 font-mono">
            {romanization} • {english}
          </p>
        </div>
        <button
          onClick={clearCanvas}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-600 cursor-pointer active:scale-95 transition-all shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>

      {strokeHint && (
        <div className="text-xs text-stone-600 bg-amber-50 border border-amber-200/80 rounded-lg p-2.5 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>{strokeHint}</span>
        </div>
      )}

      {/* Canvas Area with background watermark guide */}
      <div
        style={{ width: `${canvasSize}px`, height: `${canvasSize}px` }}
        className="relative mx-auto rounded-2xl border-2 border-amber-200 bg-amber-50/20 overflow-hidden shadow-inner flex items-center justify-center shrink-0"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            style={{ fontSize: `${canvasSize * 0.58}px` }}
            className="font-hangul font-bold text-amber-200/60 leading-none"
          >
            {targetCharacter}
          </span>
        </div>

        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="relative z-10 cursor-crosshair touch-none"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-stone-500 pt-1 gap-1">
        <span>Trace character with finger or mouse</span>
        {hasDrawn && (
          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
            <Check className="w-3.5 h-3.5" /> Looking great!
          </span>
        )}
      </div>
    </div>
  );
};
