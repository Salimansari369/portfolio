import React, { useState } from 'react';
import { Menu, X, Music, Check, FileText } from 'lucide-react';
import { AudioTrack } from '../data/audioTracks';

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  activeSection: string;
  scrollProgress: number;
  isPlayingMusic: boolean;
  currentTrackIndex: number;
  tracks: AudioTrack[];
  onToggleMusic: () => void;
  onSelectTrack: (index: number) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenQuickCustomize: () => void;
  onReset3D?: () => void;
  onNavigate?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  scrollProgress,
  isPlayingMusic,
  currentTrackIndex,
  tracks,
  onToggleMusic,
  onSelectTrack,
  reducedMotion,
  onToggleReducedMotion,
  onReset3D,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [devMenuOpen, setDevMenuOpen] = useState(false);
  const [musicMenuOpen, setMusicMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <header className="w-full px-3 sm:px-6 py-2 pointer-events-none transition-all">
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-300 transition-all duration-150 z-50 pointer-events-none"
        style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Floating Cyber Glass Pill Navbar */}
      <div className="max-w-[1720px] 2xl:max-w-[1920px] mx-auto rounded-full bg-[#030712]/90 backdrop-blur-xl border border-sky-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-4 sm:px-8 py-2 flex items-center justify-between gap-3 pointer-events-auto transition-all">
        {/* Brand Logo matching Mockup: [SA] SALIM ANSARI */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full py-0.5"
        >
          <span className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-500/40 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shadow-inner group-hover:border-cyan-400 group-hover:scale-105 transition-all">
            SA
          </span>
          <span className="font-mono font-bold tracking-[0.16em] text-xs text-white group-hover:text-cyan-400 transition-colors">
            SALIM ANSARI
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative px-3 py-1 text-[13.5px] font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive
                    ? 'text-cyan-400 font-bold'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-sky-950/40'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Utility Controls: BGM Audio | 3D Motion */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* BGM Music Controller with Track Switcher */}
          <div className="relative flex items-center">
            {/* Active Theme Icon & Play/Pause Button */}
            <button
              type="button"
              onClick={onToggleMusic}
              title={
                isPlayingMusic
                  ? `Playing ${tracks[currentTrackIndex]?.title || 'Track'} — Click to Pause`
                  : 'Play Background Audio'
              }
              aria-label={isPlayingMusic ? 'Pause background audio' : 'Play background audio'}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isPlayingMusic
                  ? 'scale-105 shadow-xs ring-2 ring-cyan-400 bg-sky-950'
                  : 'hover:scale-105 bg-slate-900 text-slate-300 hover:bg-sky-950 border border-sky-500/30'
              }`}
            >
              <span className={`text-xs select-none leading-none ${isPlayingMusic ? 'animate-bounce-subtle' : ''}`}>
                {tracks[currentTrackIndex]?.themeIcon || '🎵'}
              </span>
            </button>

            {/* Music Tracks Dropdown Menu */}
            {musicMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#050f1e]/95 backdrop-blur-xl border border-sky-500/30 p-2.5 shadow-2xl z-50 text-xs space-y-1.5 animate-in fade-in zoom-in-95 duration-150 pointer-events-auto">
                <div className="flex items-center justify-between px-2 py-1 border-b border-sky-900/50">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Background Audio</span>
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isPlayingMusic ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {isPlayingMusic ? 'Playing ♫' : 'Paused'}
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  {tracks.map((track, idx) => {
                    const isSelected = currentTrackIndex === idx;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => {
                          onSelectTrack(idx);
                          setMusicMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-sky-950 text-cyan-300 font-bold ring-1 ring-cyan-400/50'
                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{track.themeIcon}</span>
                          <div>
                            <p className="leading-tight font-bold">{track.title}</p>
                            <p className="text-[10px] text-slate-400 font-normal">{track.subtitle}</p>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1.5 border-t border-sky-900/50">
                  <button
                    type="button"
                    onClick={() => {
                      onToggleMusic();
                      setMusicMenuOpen(false);
                    }}
                    className="w-full py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-center text-xs transition-all shadow-xs cursor-pointer hover:brightness-110"
                  >
                    {isPlayingMusic ? 'Pause Audio ⏸' : 'Play Audio ▶'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ⚡ 3D Motion Toggle */}
          <button
            type="button"
            onClick={onToggleReducedMotion}
            title={reducedMotion ? 'Enable 3D motion & interactive effects' : 'Reduce motion effects'}
            aria-label={reducedMotion ? 'Enable 3D motion' : 'Reduce motion effects'}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
              !reducedMotion
                ? 'bg-sky-950/80 text-cyan-300 border-sky-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${!reducedMotion ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className="hidden sm:inline">3D Motion</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden inline-flex items-center justify-center p-1.5 rounded-lg text-slate-300 hover:bg-sky-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-md mx-auto rounded-2xl bg-[#050f1e]/95 backdrop-blur-xl border border-sky-500/30 p-3 shadow-2xl pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xs'
                      : 'text-slate-300 hover:bg-sky-950'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
