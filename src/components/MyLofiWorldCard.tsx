import React from 'react';
import { Play, Pause } from 'lucide-react';
import { AudioTrack } from '../data/audioTracks';

interface MyLofiWorldCardProps {
  tracks: AudioTrack[];
  currentTrackIndex: number;
  isPlayingMusic: boolean;
  onSelectTrack: (index: number) => void;
  onToggleMusic: () => void;
  reducedMotion: boolean;
}

export const MyLofiWorldCard: React.FC<MyLofiWorldCardProps> = ({
  tracks,
  currentTrackIndex,
  isPlayingMusic,
  onSelectTrack,
  onToggleMusic,
  reducedMotion,
}) => {
  const handleTrackClick = (idx: number) => {
    if (idx === currentTrackIndex) {
      onToggleMusic();
    } else {
      onSelectTrack(idx);
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center select-none w-full max-w-[340px] sm:max-w-[360px] mx-auto lg:mr-0 z-20">
      {/* 🌸 Sakura Chibi Sitting On Top of Card Topper */}
      <div className="relative w-full flex justify-center -mb-3 sm:-mb-4 z-30 pointer-events-auto">
        <div
          className={`relative transition-transform duration-300 ${
            isPlayingMusic && !reducedMotion ? 'animate-bounce-subtle' : ''
          }`}
        >
          <img
            src="/assets/character/hero_sakura_on_card_clean.png"
            alt="Sakura Chibi Boy sitting on My Lofi World player"
            draggable={false}
            className="h-20 sm:h-24 w-auto drop-shadow-[0_8px_18px_rgba(236,72,153,0.25)] select-none hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>

      {/* 🎵 Glassmorphic Floating Music Card Body matching media_1792088953277_0a95a00e.jpg */}
      <div className="w-full rounded-3xl bg-white/80 backdrop-blur-xl border border-white/95 shadow-[0_20px_50px_rgba(217,70,119,0.15)] p-4 sm:p-5 text-slate-800 transition-all pointer-events-auto">
        {/* Card Header: "My Lofi World" + Subtitle + Live Soundwave Visualizer */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="font-serif font-extrabold text-base sm:text-lg text-[#1e293b] leading-tight flex items-center gap-1.5">
              <span>My Lofi World</span>
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              Pick a track and vibe with me
            </p>
          </div>

          {/* Animated Soundwave Equalizer */}
          <div className="flex items-center gap-0.5 sm:gap-1 h-5 px-1.5 py-0.5 rounded-full bg-rose-50/80 border border-rose-200/60">
            {[40, 80, 55, 100, 65].map((height, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full bg-[#d94677] transition-all duration-300"
                style={{
                  height: isPlayingMusic && !reducedMotion ? `${height}%` : '25%',
                  animation:
                    isPlayingMusic && !reducedMotion
                      ? `soundwave ${0.6 + i * 0.15}s ease-in-out infinite alternate`
                      : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* 3 Interactive Track Rows */}
        <div className="space-y-2">
          {tracks.map((track, idx) => {
            const isSelected = currentTrackIndex === idx;
            const isCurrentPlaying = isSelected && isPlayingMusic;

            return (
              <div
                key={track.id}
                onClick={() => handleTrackClick(idx)}
                className={`group flex items-center justify-between p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-200 shadow-xs ring-1 ring-rose-200/80'
                    : 'bg-white/85 hover:bg-white border-white/90 hover:shadow-xs'
                }`}
              >
                {/* Left: Icon Pill + Title & Duration */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 shadow-2xs border transition-transform duration-200 group-hover:scale-105 ${
                      isSelected
                        ? 'bg-white border-rose-200'
                        : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <span className={isCurrentPlaying ? 'animate-bounce-subtle' : ''}>
                      {track.themeIcon}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-xs font-bold leading-tight truncate transition-colors ${
                        isSelected
                          ? 'text-[#d94677]'
                          : 'text-slate-700 group-hover:text-slate-900'
                      }`}
                    >
                      {track.subtitle}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                      {track.duration}
                    </p>
                  </div>
                </div>

                {/* Right: Circular Play/Pause Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTrackClick(idx);
                  }}
                  aria-label={
                    isCurrentPlaying
                      ? `Pause ${track.title}`
                      : `Play ${track.title}`
                  }
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${
                    isCurrentPlaying
                      ? 'bg-gradient-to-r from-[#d94677] to-[#ec4899] text-white shadow-xs scale-105'
                      : isSelected
                        ? 'bg-[#d94677] text-white shadow-2xs hover:scale-105'
                        : 'bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-[#d94677]'
                  }`}
                >
                  {isCurrentPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
