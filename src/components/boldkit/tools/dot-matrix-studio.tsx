import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Download, Plus, Trash2 } from 'lucide-react';

const ROWS = 8;
const COLS = 20;

function createEmptyGrid(): boolean[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(false));
}

export function DotMatrixStudio({ className }: { className?: string }) {
  const [frames, setFrames] = React.useState<boolean[][][]>([createEmptyGrid()]);
  const [currentFrameIndex, setCurrentFrameIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [fps, setFps] = React.useState(6);
  const [isDrawing, setIsDrawing] = React.useState(false);

  const currentGrid = frames[currentFrameIndex] || frames[0];

  // Playback timer
  React.useEffect(() => {
    if (!isPlaying || frames.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [isPlaying, frames.length, fps]);

  const togglePixel = (r: number, c: number) => {
    const nextFrames = [...frames];
    const newGrid = nextFrames[currentFrameIndex].map((row, ri) =>
      row.map((val, ci) => (ri === r && ci === c ? !val : val))
    );
    nextFrames[currentFrameIndex] = newGrid;
    setFrames(nextFrames);
  };

  const addFrame = () => {
    setFrames([...frames, createEmptyGrid()]);
    setCurrentFrameIndex(frames.length);
  };

  const clearCurrent = () => {
    const nextFrames = [...frames];
    nextFrames[currentFrameIndex] = createEmptyGrid();
    setFrames(nextFrames);
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(frames));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "dot-matrix-art.json");
    dlAnchorElem.click();
  };

  const exportSVG = () => {
    const dotSize = 10;
    const gap = 3;
    const width = COLS * (dotSize + gap);
    const height = ROWS * (dotSize + gap);
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
    svgContent += `<rect width="100%" height="100%" fill="#16181d"/>`;
    currentGrid.forEach((row, r) => {
      row.forEach((filled, c) => {
        const x = c * (dotSize + gap) + gap;
        const y = r * (dotSize + gap) + gap;
        svgContent += `<circle cx="${x + dotSize / 2}" cy="${y + dotSize / 2}" r="${dotSize / 2}" fill="${filled ? '#E8A317' : '#222222'}"/>`;
      });
    });
    svgContent += `</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dot-matrix.svg';
    a.click();
  };

  return (
    <div className={cn("max-w-5xl mx-auto p-6 bg-white border-4 border-black shadow-xl", className)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-black pb-4 mb-6">
        <div>
          <h2 className="text-3xl font-black font-mono">Tool 02: DOT MATRIX STUDIO</h2>
          <p className="text-sm font-medium text-neutral-600">8 × 20 Live Pixel Art & Frame-by-Frame Animator · Export WebM / PNG / SVG / JSON</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportSVG} variant="outline" className="border-2 border-black font-bold">
            <Download className="w-4 h-4 mr-1" /> SVG
          </Button>
          <Button onClick={exportJSON} className="bg-cagp-gold text-black border-2 border-black font-bold">
            <Download className="w-4 h-4 mr-1" /> JSON
          </Button>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="bg-black p-6 rounded border-4 border-black shadow-inner flex justify-center overflow-x-auto">
        <div className="grid grid-cols-20 gap-1.5" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
          {currentGrid.map((row, r) =>
            row.map((filled, c) => (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => togglePixel(r, c)}
                className={cn(
                  "w-5 h-5 sm:w-7 sm:h-7 rounded-full border border-neutral-800 transition-colors",
                  filled ? "bg-cagp-gold shadow-[0_0_8px_#E8A317]" : "bg-neutral-900 hover:bg-neutral-800"
                )}
              />
            ))
          )}
        </div>
      </div>

      {/* Playback & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 p-4 bg-neutral-100 border-2 border-black">
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsPlaying(!isPlaying)} className="bg-cagp-burgundy text-white font-bold border-2 border-black">
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? 'Pausar' : 'Animar'}
          </Button>
          <Button onClick={clearCurrent} variant="outline" className="border-2 border-black font-bold">
            <RotateCcw className="w-4 h-4 mr-2" /> Limpar
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <span className="font-mono text-xs font-bold">FPS: {fps}</span>
            <Slider value={[fps]} min={1} max={24} step={1} onValueChange={(v: any) => setFps(Array.isArray(v) ? v[0] : (v || 6))} className="w-24" />
          </div>
        </div>

        {/* Frames Timeline */}
        <div className="flex items-center gap-2">
          {frames.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => { setIsPlaying(false); setCurrentFrameIndex(idx); }}
              className={cn(
                "w-8 h-8 font-mono text-xs font-bold border-2 border-black",
                idx === currentFrameIndex ? "bg-cagp-burgundy text-white" : "bg-white text-black"
              )}
            >
              {idx + 1}
            </button>
          ))}
          <Button onClick={addFrame} size="icon" className="w-8 h-8 border-2 border-black bg-white text-black hover:bg-neutral-200">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
