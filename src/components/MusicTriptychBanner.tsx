import React from 'react';
import { Music, ChevronUp, Pause, Play } from 'lucide-react';
import { AudioTrack } from '../data/audioTracks';

interface MusicTriptychBannerProps {
  tracks: AudioTrack[];
  currentTrackIndex: number;
  isPlayingMusic: boolean;
  onSelectTrack: (index: number) => void;
  onToggleMusic: () => void;
  reducedMotion?: boolean;
}

const PANEL_ASSETS = [
  {
    index: 0,
    image: '/assets/character/panel_sunset.png',
    alt: 'Track 1 - Anime Sunset Lofi Panel with Sunset Chibi Boy',
    buttonBg: 'bg-[#fff7eb]/90 hover:bg-[#ffedd5] border-[#fed7aa] text-amber-900',
    activeBadge: 'bg-white text-amber-600 border-amber-200 shadow-2xs',
    inactiveBadge: 'bg-white/80 text-amber-700 border-amber-100',
    ringColor: 'ring-amber-400',
  },
  {
    index: 1,
    image: '/assets/character/panel_sakura.png',
    alt: 'Track 2 - Peaceful Sakura Breeze Panel with Sakura Chibi Boy',
    buttonBg: 'bg-[#fff1f5]/90 hover:bg-[#fce7f3] border-[#fbcfe8] text-pink-900',
    activeBadge: 'bg-white text-rose-500 border-pink-200 shadow-2xs',
    inactiveBadge: 'bg-white/80 text-pink-700 border-pink-100',
    ringColor: 'ring-pink-400',
  },
  {
    index: 2,
    image: '/assets/character/panel_coding.png',
    alt: 'Track 3 - Chill Coding Melody Panel with Coding Chibi Boy',
    buttonBg: 'bg-[#eff6ff]/90 hover:bg-[#dbeafe] border-[#bfdbfe] text-blue-900',
    activeBadge: 'bg-white text-blue-600 border-blue-200 shadow-2xs',
    inactiveBadge: 'bg-white/80 text-blue-700 border-blue-100',
    ringColor: 'ring-blue-400',
  },
];

export const MusicTriptychBanner: React.FC<MusicTriptychBannerProps> = ({
  tracks,
  currentTrackIndex,
  isPlayingMusic,
  onSelectTrack,
  onToggleMusic,
  reducedMotion = false,
}) => {
  const handlePanelClick = (idx: number) => {
    if (currentTrackIndex === idx) {
      onToggleMusic();
    } else {
      onSelectTrack(idx);
    }
  };

  return (
    <section
      aria-label="Interactive Music-Synced Mascots Showcase"
      className="relative w-full overflow-hidden select-none z-20 pb-6 pt-0 bg-gradient-to-b from-white/40 via-rose-50/20 to-transparent"
    >
      {/* Three Seamless Triptych Panels */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-b border-rose-100/80 shadow-xs bg-white">
        {PANEL_ASSETS.map((panel) => {
          const track = tracks[panel.index];
          const isSelected = currentTrackIndex === panel.index;
          const isActivelyPlaying = isSelected && isPlayingMusic;

          return (
            <div
              key={panel.index}
              onClick={() => handlePanelClick(panel.index)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${track?.title}: ${track?.subtitle}. ${
                isSelected ? (isActivelyPlaying ? 'Currently playing. Click to pause.' : 'Selected. Click to play.') : 'Click to select and play.'
              }`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePanelClick(panel.index);
                }
              }}
              className={`relative cursor-pointer group overflow-hidden transition-all duration-300 ${
                isSelected ? 'opacity-100' : 'opacity-90 hover:opacity-100'
              }`}
            >
              {/* Panel Scene Artwork */}
              <img
                src={panel.image}
                alt={panel.alt}
                draggable={false}
                className={`w-full h-auto object-cover transition-transform duration-300 ${
                  reducedMotion ? '' : 'group-hover:scale-[1.015]'
                }`}
              />

              {/* Active Selection Outline / Subtle Highlight Overlay */}
              {isSelected && (
                <div
                  className={`absolute inset-0 pointer-events-none border-b-2 sm:border-b-4 transition-all duration-300 ${
                    panel.index === 0
                      ? 'border-amber-400 bg-amber-500/5'
                      : panel.index === 1
                        ? 'border-pink-400 bg-pink-500/5'
                        : 'border-blue-400 bg-blue-500/5'
                  }`}
                />
              )}

              {/* Floating Active Play State Badge */}
              <div
                className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md transition-all duration-200 ${
                  isSelected
                    ? isActivelyPlaying
                      ? 'bg-white/95 text-emerald-700 shadow-sm border border-emerald-200'
                      : 'bg-white/95 text-slate-700 shadow-sm border border-slate-200'
                    : 'opacity-0 group-hover:opacity-100 bg-white/90 text-slate-600 border border-slate-200'
                }`}
              >
                {isSelected ? (
                  isActivelyPlaying ? (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>Playing ♫</span>
                    </span>
                  ) : (
                    <span>Selected ⏸</span>
                  )
                ) : (
                  <span>Click to Play ▶</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Three Aligned Interactive Track Selector Pill Buttons */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 mt-3.5 sm:mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 justify-items-center">
          {PANEL_ASSETS.map((panel) => {
            const track = tracks[panel.index];
            const isSelected = currentTrackIndex === panel.index;
            const isActivelyPlaying = isSelected && isPlayingMusic;

            return (
              <button
                key={panel.index}
                type="button"
                onClick={() => handlePanelClick(panel.index)}
                aria-pressed={isSelected}
                title={`${track?.title} — ${track?.subtitle} (${isSelected ? (isActivelyPlaying ? 'Playing' : 'Paused') : 'Select'})`}
                className={`w-full max-w-xs inline-flex items-center justify-between sm:justify-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border shadow-xs transition-all duration-200 cursor-pointer ${
                  panel.buttonBg
                } ${
                  isSelected
                    ? `ring-2 ${panel.ringColor} shadow-md scale-[1.02]`
                    : 'hover:scale-[1.01] hover:shadow-sm opacity-90 hover:opacity-100'
                }`}
              >
                {/* Left Theme Icon (☀️, 🌸, 🐱) */}
                <span className="text-base sm:text-lg select-none leading-none shrink-0">
                  {track?.themeIcon}
                </span>

                {/* Inner Track Pill Badge: [ 🎵 Track N ⌃ ] */}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border transition-colors shrink-0 ${
                    isSelected ? panel.activeBadge : panel.inactiveBadge
                  }`}
                >
                  <Music className="w-2.5 h-2.5 shrink-0" />
                  <span>{track?.title}</span>
                  <ChevronUp className="w-2.5 h-2.5 shrink-0 opacity-70" />
                </span>

                {/* Track Subtitle */}
                <span className="text-xs sm:text-[13px] font-semibold truncate leading-tight">
                  {track?.subtitle}
                </span>

                {/* Active Play/Pause Indicator Icon on Right */}
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center text-[10px] shadow-2xs shrink-0 ml-auto sm:ml-0">
                    {isActivelyPlaying ? (
                      <Pause className="w-2.5 h-2.5 fill-current" />
                    ) : (
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
