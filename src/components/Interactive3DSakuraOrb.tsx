import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Move3d } from 'lucide-react';

interface Interactive3DSakuraOrbProps {
  resetSignal?: number;
  reducedMotion?: boolean;
}

const INITIAL_ROTATION = { x: -12, y: 24 };

export const Interactive3DSakuraOrb: React.FC<Interactive3DSakuraOrbProps> = ({
  resetSignal = 0,
  reducedMotion = false,
}) => {
  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const targetRotRef = useRef({ ...INITIAL_ROTATION });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ clientX: 0, clientY: 0, rotX: -12, rotY: 24 });
  const [isDragging, setIsDragging] = useState(false);

  // Reset when triggered externally
  useEffect(() => {
    targetRotRef.current = { ...INITIAL_ROTATION };
  }, [resetSignal]);

  // Smooth damping loop
  useEffect(() => {
    if (reducedMotion) {
      setRotation(INITIAL_ROTATION);
      return;
    }

    let rafId: number;
    const animate = () => {
      setRotation((prev) => {
        const dx = targetRotRef.current.x - prev.x;
        const dy = targetRotRef.current.y - prev.y;
        if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) return prev;
        return {
          x: prev.x + dx * 0.14,
          y: prev.y + dy * 0.14,
        };
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      rotX: targetRotRef.current.x,
      rotY: targetRotRef.current.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.clientX;
    const deltaY = e.clientY - dragStartRef.current.clientY;

    // Sensible rotation limits: X clamped to [-55, 55], Y clamped to [-160, 160]
    const nextX = Math.max(-55, Math.min(55, dragStartRef.current.rotX - deltaY * 0.55));
    const nextY = Math.max(-160, Math.min(160, dragStartRef.current.rotY + deltaX * 0.65));

    targetRotRef.current = { x: nextX, y: nextY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if not captured
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    targetRotRef.current = { ...INITIAL_ROTATION };
  };

  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white/85 backdrop-blur-md border border-white/95 shadow-md select-none">
      {/* Designated Drag-to-Rotate 3D Japanese Lantern / AI Gyroscope Object */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Interactive 3D Sakura Lantern — drag to rotate in 3D"
        aria-valuenow={Math.round(rotation.y)}
        aria-valuemin={-160}
        aria-valuemax={160}
        data-cursor-interactive="true"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') targetRotRef.current.y = Math.max(-160, targetRotRef.current.y - 15);
          if (e.key === 'ArrowRight') targetRotRef.current.y = Math.min(160, targetRotRef.current.y + 15);
          if (e.key === 'ArrowUp') targetRotRef.current.x = Math.min(55, targetRotRef.current.x + 12);
          if (e.key === 'ArrowDown') targetRotRef.current.x = Math.max(-55, targetRotRef.current.x - 12);
        }}
        style={{ perspective: '420px', touchAction: 'none' }}
        className={`relative w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-950/90 via-[#2a1f4a] to-[#43285c] flex items-center justify-center shadow-inner border border-indigo-200/50 ${
          isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-105'
        } transition-transform`}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x.toFixed(1)}deg) rotateY(${rotation.y.toFixed(1)}deg)`,
          }}
          className="relative w-6 h-6 flex items-center justify-center"
        >
          {/* 3D Lantern / Prism Front Face */}
          <div
            style={{ transform: 'translateZ(10px)' }}
            className="absolute inset-0 rounded-md bg-gradient-to-b from-amber-200/90 via-amber-300/85 to-rose-300/85 border border-amber-100 flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.45)]"
          >
            <span className="text-[10px] font-bold text-amber-950">🌸</span>
          </div>
          {/* Back Face */}
          <div
            style={{ transform: 'rotateY(180deg) translateZ(10px)' }}
            className="absolute inset-0 rounded-md bg-gradient-to-b from-amber-200/90 via-amber-300/85 to-rose-300/85 border border-amber-100 flex items-center justify-center"
          >
            <span className="text-[9px] font-extrabold text-indigo-950">AI</span>
          </div>
          {/* Left Face */}
          <div
            style={{ transform: 'rotateY(-90deg) translateZ(10px)' }}
            className="absolute inset-0 rounded-md bg-gradient-to-b from-amber-300/80 to-orange-300/80 border border-amber-200/80 flex items-center justify-center"
          >
            <span className="w-1.5 h-3 rounded-full bg-amber-100/90" />
          </div>
          {/* Right Face */}
          <div
            style={{ transform: 'rotateY(90deg) translateZ(10px)' }}
            className="absolute inset-0 rounded-md bg-gradient-to-b from-amber-300/80 to-orange-300/80 border border-amber-200/80 flex items-center justify-center"
          >
            <span className="w-1.5 h-3 rounded-full bg-amber-100/90" />
          </div>
          {/* Outer Equatorial Orbit Ring */}
          <div
            style={{ transform: 'rotateX(75deg)' }}
            className="absolute -inset-2 rounded-full border border-pink-300/75 pointer-events-none"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#1e2b54]">
          <Move3d className="w-3 h-3 text-indigo-600" />
          <span>3D Lantern</span>
        </div>
        <span className="text-[10px] text-slate-500 font-medium">
          Drag to rotate ({Math.round(rotation.y)}°)
        </span>
      </div>

      <button
        type="button"
        onClick={handleReset}
        title="Reset 3D orientation"
        aria-label="Reset 3D lantern orientation"
        className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/70 transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
      </button>
    </div>
  );
};
