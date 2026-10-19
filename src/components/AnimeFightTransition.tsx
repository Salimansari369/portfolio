import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, X, Zap } from 'lucide-react';

interface AnimeFightTransitionProps {
  targetSection: string | null;
  isActive: boolean;
  onComplete: () => void;
}

export const AnimeFightTransition: React.FC<AnimeFightTransitionProps> = ({
  targetSection,
  isActive,
  onComplete,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const isFinishedRef = useRef<boolean>(false);

  // Complete and cleanly reveal target section
  const finishTransition = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    // 1. Scroll to the target section instantly while covered by the flash/overlay
    if (targetSection) {
      const el = document.getElementById(targetSection);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
      }
    }

    // 2. Smoothly fade out the black/flash overlay
    setIsFadingOut(true);

    // 3. Unmount after fade-out transition completes
    setTimeout(() => {
      onComplete();
    }, 320);
  }, [targetSection, onComplete]);

  // Handle video playback, error handling, and autoplay fallbacks
  useEffect(() => {
    if (!isActive) return;

    isFinishedRef.current = false;
    setIsFadingOut(false);
    setHasScrolled(false);

    const video = videoRef.current;
    if (!video) {
      finishTransition();
      return;
    }

    // Safety timeout: If video stalls, hangs, or network drops, force finish within 3.5s
    const safetyTimeout = setTimeout(() => {
      finishTransition();
    }, 3500);

    // Escape key listener to skip transition
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishTransition();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Start video playback
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay with audio blocked, attempting muted playback:', err);
        // Autoplay policy fallback: mute and retry immediately
        video.muted = true;
        setIsMuted(true);
        video.play().catch((secondErr) => {
          console.warn('Video playback completely failed, navigating directly:', secondErr);
          finishTransition();
        });
      });
    }

    return () => {
      clearTimeout(safetyTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, finishTransition]);

  // Pre-scroll at impact climax (~2.7s) so target section is ready before reveal
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    // At 2.75s (during peak white impact flash), scroll to section underneath
    if (video.currentTime >= 2.75 && !hasScrolled) {
      setHasScrolled(true);
      if (targetSection) {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
        }
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    finishTransition();
  };

  if (!isActive) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden select-none pointer-events-auto transition-opacity duration-300 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Scene transition animation"
    >
      {/* 3-Second High-Octane Anime Fight Transition Video */}
      <video
        ref={videoRef}
        src="/assets/video/anime_fight_transition.mp4"
        playsInline
        autoPlay
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={finishTransition}
        onError={() => {
          console.warn('Transition video load error, falling back to direct navigation.');
          finishTransition();
        }}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Target Section Badge Indicator */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wider uppercase animate-in fade-in slide-in-from-top-4 duration-300">
        <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
        <span>Jumping to #{targetSection || 'Section'}</span>
      </div>

      {/* Top-Right Fast Controls: Audio Mute & Skip Button */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          title="Skip transition (Esc)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Skip animation and go directly to section"
        >
          <span>Skip</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Subtle Impact Flash Screen Overlay at Climax */}
      <div
        className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-150 ${
          hasScrolled ? 'opacity-30' : 'opacity-0'
        }`}
      />
    </div>
  );
};
