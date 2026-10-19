import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface InteractiveEyeTrackingAvatarProps {
  cursorOffset: { x: number; y: number }; // -1.1 to +1.1 normalized gaze
  reducedMotion: boolean;
}

export const InteractiveEyeTrackingAvatar: React.FC<InteractiveEyeTrackingAvatarProps> = ({
  cursorOffset,
  reducedMotion,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural intermittent eye blinking (every 4-6s for 150ms)
  useEffect(() => {
    if (reducedMotion) return;

    let blinkTimeout: number;
    let nextBlinkTimer: number;

    const scheduleNextBlink = () => {
      const delay = 3500 + Math.random() * 3000;
      nextBlinkTimer = window.setTimeout(() => {
        setIsBlinking(true);
        blinkTimeout = window.setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 150);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      clearTimeout(nextBlinkTimer);
      clearTimeout(blinkTimeout);
    };
  }, [reducedMotion]);

  // Compute pupil displacement (clamped within eye socket dimensions)
  // Eye socket dimensions allow ~13px horizontal movement, ~7.5px vertical movement
  const maxIrisX = 13.0;
  const maxIrisY = 7.5;

  const irisX = reducedMotion ? 0 : cursorOffset.x * maxIrisX;
  const irisY = reducedMotion ? 0 : cursorOffset.y * maxIrisY;

  // 3D Head and Body Look-At Tilt (matches the viral reel)
  const headRotateY = reducedMotion ? 0 : cursorOffset.x * 9.5;
  const headRotateX = reducedMotion ? 0 : -cursorOffset.y * 7.5;
  const headTranslateX = reducedMotion ? 0 : cursorOffset.x * 12;
  const headTranslateY = reducedMotion ? 0 : cursorOffset.y * 8;

  return (
    <div
      style={{
        perspective: '1000px',
      }}
      className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[520px] aspect-[863/1024] flex items-end justify-center select-none"
    >
      {/* 3D Rotating & Parallax Frame */}
      <div
        style={{
          transformOrigin: '50% 88%',
          transform: reducedMotion
            ? 'none'
            : `rotateX(${headRotateX.toFixed(2)}deg) rotateY(${headRotateY.toFixed(2)}deg) translate3d(${headTranslateX.toFixed(1)}px, ${headTranslateY.toFixed(1)}px, 0)`,
          transformStyle: 'preserve-3d',
          transition: reducedMotion ? 'none' : 'transform 0.14s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full h-full will-change-transform flex items-end justify-center"
      >
        {/* Soft Sunset Rim Glow Behind Avatar */}
        <div
          style={{
            transform: `translate3d(${(-cursorOffset.x * 12).toFixed(1)}px, ${(-cursorOffset.y * 10).toFixed(1)}px, -30px)`,
          }}
          className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-rose-400/20 via-pink-400/20 to-amber-300/30 blur-2xl pointer-events-none"
        />

        {/* Salim's Pristine High-Res 3D Avatar (Grounded, zero clutter) */}
        <img
          src="/assets/salim-avatar-cutout.png"
          alt="Salim Ansari — Interactive 3D Developer Avatar"
          draggable={false}
          className="relative w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(20,28,55,0.32)] pointer-events-auto z-20"
        />

        {/* Dynamic Specular Light Glare moving across the suit jacket based on cursor */}
        <div
          style={{
            background: `radial-gradient(circle at ${50 + cursorOffset.x * 38}% ${36 + cursorOffset.y * 30}%, rgba(255,255,255,0.22), transparent 52%)`,
          }}
          className="absolute inset-0 pointer-events-none rounded-3xl z-20"
        />
      </div>
    </div>
  );
};
