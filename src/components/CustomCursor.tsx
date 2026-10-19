import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  reducedMotion: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ reducedMotion }) => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateCapability = () => {
      setIsFinePointer(mq.matches && !prefersReduced.matches && !reducedMotion);
    };
    updateCapability();

    mq.addEventListener('change', updateCapability);
    prefersReduced.addEventListener('change', updateCapability);
    return () => {
      mq.removeEventListener('change', updateCapability);
      prefersReduced.removeEventListener('change', updateCapability);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!isFinePointer) return;

    const targetPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      if (!hasMoved) {
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
        hasMoved = true;
        setIsVisible(true);
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.x}px, ${targetPos.y}px, 0) translate(-50%, -50%)`;
      }

      const targetEl = e.target as HTMLElement | null;
      const interactive = targetEl?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-interactive="true"]'
      );
      setIsHoveringInteractive(Boolean(interactive));
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => {
      if (hasMoved) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    let rafId: number;
    const animateRing = () => {
      ringPos.x += (targetPos.x - ringPos.x) * 0.18;
      ringPos.y += (targetPos.y - ringPos.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x.toFixed(1)}px, ${ringPos.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(rafId);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Subtle Outer Following Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,border-color,background-color,opacity] duration-200 ease-out will-change-transform ${
          isPressed
            ? 'w-7 h-7 border-2 border-indigo-500/80 bg-indigo-400/15'
            : isHoveringInteractive
              ? 'w-11 h-11 border-[1.5px] border-indigo-500/70 bg-lavender-300/15 shadow-[0_0_16px_rgba(99,102,241,0.22)]'
              : 'w-8 h-8 border border-indigo-400/55 bg-white/5'
        }`}
      />

      {/* Small Glowing Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,background-color,box-shadow] duration-150 ease-out will-change-transform ${
          isHoveringInteractive
            ? 'w-2 h-2 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.75)]'
            : 'w-1.5 h-1.5 bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.7)]'
        }`}
      />
    </div>
  );
};
