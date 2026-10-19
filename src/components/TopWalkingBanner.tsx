import React, { useState, useEffect, useRef } from 'react';
import { AudioTrack } from '../data/audioTracks';
import { DancingMascot } from './DancingMascot';

interface TopWalkingBannerProps {
  activeSection: string;
  reducedMotion: boolean;
  currentTrack: AudioTrack;
  isPlayingMusic: boolean;
}

const SECTION_THOUGHTS: Record<string, string> = {
  home: 'Welcome to my profile ✨',
  about: 'Exploring AI/ML & Research Journey 📖',
  education: 'SIT Nagpur • 3rd Year B.Tech CSE 🎓',
  skills: 'Deep Learning, PyTorch, FastAPI & Cloud ⚡',
  projects: 'Check out LiteratureAI & MediLink 🚀',
  achievements: 'Hackathons, Kaggle & Milestones 🏆',
  certificates: 'Verified Credentials & Specializations 📜',
  gallery: 'Campus Life & Tech Highlights 📸',
  contact: "Let's connect & build something impactful! 💌",
};

interface WalkState {
  progress: number;       // % across the banner walkway
  direction: 1 | -1;      // 1 = walking Right, -1 = walking Left
  turnTimer: number;      // Small pause when turning around
  phase: number;          // Continuous radian phase for 4-step walk cycle
}

export const TopWalkingBanner: React.FC<TopWalkingBannerProps> = ({
  activeSection,
  reducedMotion,
  currentTrack,
  isPlayingMusic,
}) => {
  const [bubbleHover, setBubbleHover] = useState(false);

  // Walk position state (walks back and forth across the banner path)
  const [walk, setWalk] = useState<WalkState>({
    progress: 25,
    direction: 1,
    turnTimer: 0,
    phase: 0,
  });

  const isPlayingRef = useRef(isPlayingMusic);
  useEffect(() => {
    isPlayingRef.current = isPlayingMusic;
  }, [isPlayingMusic]);

  // Active walking loop (runs continuously: energetic dance-walk when playing, cute stroll when paused)
  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Natural traverse speed across the full screen width:
      // ~17s per pass when dancing, ~28s per pass when strolling
      const speedPctPerSec = isPlayingRef.current ? 4.8 : 2.8;
      // 4-frame walk cycle duration: 0.68s when dancing, 1.05s when strolling
      const cycleDuration = isPlayingRef.current ? 0.68 : 1.05;
      const phaseDelta = (dt / cycleDuration) * 4;

      setWalk((prev) => {
        // Full viewport span boundaries: from far left start (1%) to far right end (82%)
        const minBoundary = 1.0;
        const maxBoundary = 82.0;

        if (prev.turnTimer > 0) {
          const nextTimer = Math.max(0, prev.turnTimer - dt);
          // Mid-turn flip: flip facing direction halfway through the wave pause
          let currentDir = prev.direction;
          if (prev.turnTimer > 0.4 && nextTimer <= 0.4) {
            currentDir = prev.progress >= maxBoundary ? -1 : 1;
          }
          return {
            ...prev,
            direction: currentDir,
            turnTimer: nextTimer,
          };
        }

        let nextProgress = prev.progress + prev.direction * speedPctPerSec * dt;
        let nextDirection = prev.direction;
        let nextTurn = 0;

        if (nextProgress >= maxBoundary) {
          nextProgress = maxBoundary;
          nextTurn = 0.8; // Brief wave pause before walking back
        } else if (nextProgress <= minBoundary) {
          nextProgress = minBoundary;
          nextTurn = 0.8; // Brief wave pause before walking back
        }

        const nextPhase = (prev.phase + phaseDelta) % 4;

        return {
          progress: nextProgress,
          direction: nextDirection,
          turnTimer: nextTurn,
          phase: nextPhase,
        };
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  const defaultWelcome = 'Welcome to my profile';
  const sectionThought = SECTION_THOUGHTS[activeSection] || defaultWelcome;
  const currentText = bubbleHover ? sectionThought : defaultWelcome;

  return (
    <div
      className="relative w-full h-20 sm:h-24 bg-[#020813]/95 backdrop-blur-xl border-b border-cyan-500/20 overflow-hidden select-none z-30 shadow-[0_4px_30px_rgba(0,0,0,0.6)] transition-colors duration-700 ease-in-out"
      role="region"
      aria-label="Interactive cyber runway with music-synced walking and dancing mascot"
    >
      {/* Background Cyber Ambient Glow & Laser Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient Glowing Orbs */}
        <div
          className="absolute -top-10 left-1/4 w-72 h-24 rounded-full blur-2xl opacity-20 transition-all duration-700"
          style={{ backgroundColor: currentTrack.themeColor || '#00f0ff' }}
        />
        <div className="absolute -top-8 right-1/3 w-80 h-24 rounded-full blur-2xl opacity-15 bg-blue-600" />

        {/* Subtle Cyber Matrix Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff07_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff07_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Ambient Floating Cyber Music Notes */}
        <span
          className="absolute top-3 left-[18%] text-xs font-mono select-none opacity-50 animate-note-float-1 hidden sm:inline"
          style={{ color: currentTrack.noteColor || '#38bdf8' }}
        >
          🎵
        </span>
        <span
          className="absolute top-4 left-[36%] text-[11px] font-mono select-none opacity-50 animate-note-float-2 hidden md:inline"
          style={{ color: currentTrack.noteColor || '#38bdf8' }}
        >
          🎶
        </span>
        <span
          className="absolute top-2.5 right-[34%] text-xs font-mono select-none opacity-50 animate-note-float-1 hidden md:inline"
          style={{ color: currentTrack.noteColor || '#38bdf8' }}
        >
          ♫
        </span>
        <span
          className="absolute top-4 right-[22%] text-xs font-mono select-none opacity-50 animate-note-float-3 hidden sm:inline"
          style={{ color: currentTrack.noteColor || '#38bdf8' }}
        >
          ⚡
        </span>
      </div>

      {/* Dynamic Walking Track Area (Full-bleed screen width from extreme left to extreme right) */}
      <div className="relative w-full h-full px-2 sm:px-4 flex items-center">
        {/* Walking & Dancing Character Group (Moves dynamically along the path) */}
        <div
          style={{
            left: reducedMotion ? '35%' : `${walk.progress}%`,
            transition: isPlayingMusic ? 'none' : 'left 0.4s ease-out',
          }}
          className="absolute bottom-1 sm:bottom-1.5 flex items-end will-change-[left] z-20"
        >
          {/* Flip Container for Walk Direction (1 = facing right, -1 = facing left) */}
          <div
            style={{
              transform: `scaleX(${walk.direction})`,
            }}
            className="flex items-end gap-2 sm:gap-3 transition-transform duration-300"
          >
            {/* The 3D Dancing & Walking Mascot */}
            <DancingMascot
              track={currentTrack}
              isPlaying={isPlayingMusic}
              reducedMotion={reducedMotion}
              walkPhase={walk.phase}
              isPausingTurn={walk.turnTimer > 0}
            />

            {/* "Welcome to my profile" Pill Bubble (Un-flipped text so it's always readable) */}
            <div
              style={{
                transform: `scaleX(${walk.direction})`,
              }}
              onMouseEnter={() => setBubbleHover(true)}
              onMouseLeave={() => setBubbleHover(false)}
              className="mb-3 px-3 sm:px-4 py-1.5 rounded-full bg-[#051126]/90 backdrop-blur-md border border-cyan-500/40 shadow-[0_0_15px_rgba(0,210,255,0.25)] text-xs sm:text-[12px] font-mono font-medium text-cyan-200 flex items-center gap-1.5 cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] shrink-0"
            >
              <span className="text-cyan-400 text-xs select-none">✨</span>
              <span className="leading-none whitespace-nowrap">{currentText}</span>
              <span className="text-cyan-400 text-xs select-none">✨</span>
            </div>
          </div>
        </div>

        {/* Right Utility: AI Engineer Status Badge */}
        <div
          className="hidden md:flex items-center gap-2.5 absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
          aria-hidden="true"
        >
          <div className="px-3.5 py-1.5 rounded-full bg-[#051126]/85 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_12px_rgba(0,210,255,0.18)] flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-[11px] font-mono tracking-wider font-semibold text-cyan-300 uppercase">
              AI Engineer: {isPlayingMusic ? 'Vibing 🎵' : 'Active ⚡'}
            </span>
          </div>
        </div>
      </div>

      {/* Cyber Neon Dotted / Dashed Divider Line at the bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-[2px] opacity-80 transition-colors duration-500"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, #00f0ff 0px, #00f0ff 8px, transparent 8px, transparent 18px)`,
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        }}
      />
    </div>
  );
};
