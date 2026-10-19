import React, { useState, useEffect } from 'react';
import { AudioTrack } from '../data/audioTracks';

interface DancingMascotProps {
  track: AudioTrack;
  isPlaying: boolean;
  reducedMotion: boolean;
  walkPhase?: number;
  isPausingTurn?: boolean;
}

const PRO_WALK_FRAMES = [
  '/assets/character/pro_walk_1.png',
  '/assets/character/pro_walk_2.png',
  '/assets/character/pro_walk_3.png',
  '/assets/character/pro_walk_4.png',
];

export const DancingMascot: React.FC<DancingMascotProps> = ({
  track,
  isPlaying,
  reducedMotion,
  walkPhase = 0,
  isPausingTurn = false,
}) => {
  const [isJumping, setIsJumping] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  // Preload all 4 black & white walking frames on mount for seamless 60FPS animation
  useEffect(() => {
    PRO_WALK_FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleMascotClick = () => {
    if (isJumping) return;
    setIsJumping(true);
    const phrases = [
      'Welcome to my profile! 🚀',
      'Thanks for visiting! Let’s connect 🤝',
      `Grooving to ${track.subtitle}! 🎧`,
      'Building next-gen AI & ML models 🧠',
      'Explore my projects below! ⚡',
    ];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    setBubbleText(phrase);

    setTimeout(() => setIsJumping(false), 800);
    setTimeout(() => setBubbleText(null), 2800);
  };

  // Determine current frame in the 4-phase walk cycle (1, 2, 3, 4)
  const frameIdx = Math.floor(Math.abs(walkPhase) % 4);
  // Frame 2 is the tall upright passing/standing pose used when pausing/turning
  const activeFrame = isPausingTurn ? PRO_WALK_FRAMES[1] : PRO_WALK_FRAMES[frameIdx];

  // Natural subtle vertical bounce: slight lift on passing steps (frames 2 & 4 / index 1 & 3)
  const isPassingStep = frameIdx === 1 || frameIdx === 3;
  let translateY = 0;
  if (!reducedMotion) {
    if (isJumping) {
      translateY = -18;
    } else if (isPausingTurn) {
      translateY = 0;
    } else if (isPlaying) {
      translateY = isPassingStep ? -4 : 0;
    } else {
      translateY = isPassingStep ? -2.5 : 0;
    }
  }

  // Shadow dynamics synchronized with walking steps
  const shadowScale = isJumping
    ? 0.7
    : isPausingTurn
      ? 1.0
      : isPassingStep
        ? 0.88
        : 1.15;
  const shadowOpacity = isJumping
    ? 0.15
    : isPausingTurn
      ? 0.45
      : isPassingStep
        ? 0.35
        : 0.55;

  return (
    <div className="relative inline-flex flex-col items-center justify-end select-none group">
      {/* Speech / Reaction Thought Bubble on Click */}
      {bubbleText && (
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-[#051126]/95 backdrop-blur-md border border-cyan-500/50 text-[11.5px] font-mono font-semibold text-cyan-200 shadow-[0_0_15px_rgba(0,210,255,0.35)] whitespace-nowrap z-30 animate-in fade-in zoom-in-95 duration-150 pointer-events-none"
          role="status"
        >
          <span>{bubbleText}</span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#051126] rotate-45 border-r border-b border-cyan-500/50" />
        </div>
      )}

      {/* Floating Musical Notes Particles (When playing & motion active) */}
      {isPlaying && !reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          <span
            className="absolute -top-3 -left-3 text-xs font-bold animate-note-float-1 select-none pointer-events-none"
            style={{ color: track.noteColor || '#00f0ff' }}
          >
            🎵
          </span>
          <span
            className="absolute -top-4 -right-3 text-xs font-bold animate-note-float-2 select-none pointer-events-none"
            style={{ color: track.noteColor || '#00f0ff' }}
          >
            🎶
          </span>
          <span
            className="absolute top-2 -right-4 text-[10px] font-bold animate-note-float-3 select-none pointer-events-none"
            style={{ color: track.noteColor || '#00f0ff' }}
          >
            ⚡
          </span>
        </div>
      )}

      {/* Interactive High-Contrast Black & White Character Button */}
      <button
        type="button"
        onClick={handleMascotClick}
        title="Salim Ansari (AI Engineer) - Click to say hi!"
        aria-label="High-contrast black and white AI engineer character walking along runway. Click to interact."
        className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl flex flex-col items-center justify-end"
      >
        {/* Dynamic Ground Footstep Shadow with Cyber Cyan Underglow */}
        <div
          style={{
            transform: `scaleX(${shadowScale})`,
            opacity: shadowOpacity,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
          className="w-14 sm:w-16 h-2 rounded-full bg-cyan-950/80 border border-cyan-400/40 blur-[1px] absolute -bottom-0.5 pointer-events-none shadow-[0_0_12px_rgba(0,240,255,0.45)]"
        />

        {/* High-Contrast Black & White Walking Character Sprite Frame */}
        <div
          style={{
            transform: `translate3d(0, ${translateY}px, 0)`,
            transition: isJumping ? 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.1s ease-out',
          }}
          className="relative will-change-transform flex items-end justify-center filter drop-shadow-[0_4px_16px_rgba(255,255,255,0.18)] drop-shadow-[0_2px_8px_rgba(0,240,255,0.28)]"
        >
          <img
            src={activeFrame}
            alt="Black & White AI Engineer Walking Character"
            draggable={false}
            className="h-[68px] sm:h-[78px] w-auto object-contain select-none pointer-events-none"
          />
        </div>
      </button>
    </div>
  );
};
