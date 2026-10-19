import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Compass,
  Briefcase,
  CheckCircle2,
  MapPin,
  Cpu,
  Code2,
  Camera,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Video,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface AboutSectionProps {
  personal: typeof PORTFOLIO_DATA.personal;
  aboutJournal: typeof PORTFOLIO_DATA.aboutJournal;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ personal, aboutJournal }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'goals' | 'career'>('story');
  const [showRealPhoto, setShowRealPhoto] = useState<boolean>(true);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);



  const toggleVideoMute = () => {
    if (!introVideoRef.current) return;
    const nextMuted = !introVideoRef.current.muted;
    introVideoRef.current.muted = nextMuted;
    setIsVideoMuted(nextMuted);
  };

  const toggleVideoPlay = () => {
    if (!introVideoRef.current) return;
    if (introVideoRef.current.paused) {
      introVideoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      introVideoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1560px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender-100/90 text-indigo-800 text-xs font-bold tracking-wider uppercase border border-lavender-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Chapter 01 • Developer Journal</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#1b274b]">
            About Me &amp; Career Profile
          </h2>
        </div>

      </div>

      {/* Main Anime Journal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Real Portrait / Anime Avatar Toggle & Quick Profile Card (5 cols) */}
        <div className="lg:col-span-5 anime-glass-card rounded-3xl p-6 relative overflow-hidden">
          {/* Portrait Mode Switcher (Real Portrait vs Anime Avatar) */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              {showRealPhoto ? 'Real Portrait' : 'Anime Persona'}
            </span>
            <button
              type="button"
              onClick={() => setShowRealPhoto((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{showRealPhoto ? 'Switch to Anime Art' : 'View Real Photo'}</span>
            </button>
          </div>

          <div className="relative py-2 flex flex-col items-center">
            <div className="relative rounded-full overflow-hidden border-4 border-white shadow-xl aspect-square w-60 sm:w-64 bg-white">
              <img
                src={showRealPhoto ? personal.realPhotoImage : personal.avatarImage}
                alt={
                  showRealPhoto
                    ? 'Salim Ansari — Personal Photograph'
                    : 'Salim Ansari — Original Anime Developer Portrait'
                }
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover rounded-full transition-all duration-500"
              />
            </div>

            <div className="mt-4 w-full bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-indigo-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-sm text-[#1b274b]">{personal.name}</p>
                <p className="text-[11px] font-semibold text-indigo-600">
                  B.Tech CSE (AI &amp; ML)
                </p>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SIT Nagpur
              </span>
            </div>
          </div>

          {/* Quick Facts Grid */}
          <div className="mt-6 space-y-2">
            {aboutJournal.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-start justify-between gap-3 py-2 px-3 rounded-xl bg-white/75 border border-indigo-50 text-xs"
              >
                <span className="font-semibold text-slate-500 shrink-0">{fact.label}</span>
                <span className="font-bold text-[#222f57] text-right">{fact.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-indigo-100/80 flex items-center justify-between text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              {personal.location}
            </span>
            <span className="font-handwriting text-lg text-indigo-700 font-bold">
              Learn • Architect • Build
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Editorial Notebook Card (7 cols) */}
        <div className="lg:col-span-7 anime-glass-card rounded-3xl p-6 sm:p-8 relative">
          {/* Journal Tab Switcher */}
          <div
            role="tablist"
            aria-label="About Salim Ansari sections"
            className="flex flex-wrap gap-2 pb-5 mb-6 border-b border-indigo-100"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'story'}
              onClick={() => setActiveTab('story')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'story'
                  ? 'bg-gradient-to-r from-[#7e60ed] to-[#6366f1] text-white shadow-md'
                  : 'bg-white/80 text-slate-600 hover:bg-indigo-50 border border-indigo-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Story &amp; Intro Video</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'goals'}
              onClick={() => setActiveTab('goals')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'goals'
                  ? 'bg-gradient-to-r from-[#7e60ed] to-[#6366f1] text-white shadow-md'
                  : 'bg-white/80 text-slate-600 hover:bg-indigo-50 border border-indigo-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>2026–2027 Engineering Quests</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'career'}
              onClick={() => setActiveTab('career')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'career'
                  ? 'bg-gradient-to-r from-[#7e60ed] to-[#6366f1] text-white shadow-md'
                  : 'bg-white/80 text-slate-600 hover:bg-indigo-50 border border-indigo-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Career &amp; Experience</span>
            </button>
          </div>

          {/* Journal Tab Content Area - Static min-height with top anchoring to prevent layout jumping */}
          <div className="min-h-[580px] flex flex-col justify-start">
            {/* TAB 1: STORY + PERSONAL WIX INTRO VIDEO REEL */}
            {activeTab === 'story' && (
              <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Left sub-column: Story Text & Quote (7 cols) */}
                <div className="xl:col-span-7 space-y-4">
                  {aboutJournal.storyParagraphs.map((para, i) => (
                    <p key={i} className="text-sm sm:text-[15px] leading-relaxed text-slate-700">
                      {para}
                    </p>
                  ))}

                  {/* Philosophy Quote Block from GitHub Profile */}
                  <blockquote className="p-4 rounded-2xl bg-indigo-50/70 border-l-4 border-indigo-500 text-xs sm:text-sm italic text-indigo-950 font-medium">
                    &ldquo;{personal.philosophyQuote}&rdquo;
                  </blockquote>
                </div>

                {/* Right sub-column: Salim's Personal Wix Intro Reel (5 cols) */}
                <div className="xl:col-span-5 flex flex-col items-center">
                  <div className="w-full max-w-[270px] rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-[#0f172a] relative group aspect-[9/16]">
                    <video
                      ref={introVideoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      poster={personal.introVideoPoster}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                    >
                      <source src={personal.introVideoUrl} type="video/mp4" />
                      <source src={personal.introRemoteVideoUrl} type="video/mp4" />
                    </video>

                    {/* Top Overlay: Video Badge + Play/Pause */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16203d]/80 text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 shadow-sm">
                        <Video className="w-3 h-3 text-skyworld-300" />
                        <span>My Intro Reel</span>
                      </span>

                      <button
                        type="button"
                        onClick={toggleVideoPlay}
                        title={isVideoPlaying ? 'Pause video' : 'Play video'}
                        aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                        className="p-1.5 rounded-full bg-[#16203d]/80 hover:bg-[#16203d] text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                      >
                        {isVideoPlaying ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Bottom Overlay: Voiceover Mute/Unmute + Caption */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#16203d]/95 via-[#16203d]/60 to-transparent p-3.5 text-white flex items-end justify-between gap-2">
                      <div>
                        <p className="font-serif font-bold text-sm leading-tight">Salim Ansari</p>
                        <p className="text-[11px] text-skyworld-200 font-medium">
                          Campus &amp; Coding Journey
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={toggleVideoMute}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#1b274b] text-[11px] font-bold shadow-md transition-all cursor-pointer shrink-0"
                      >
                        {isVideoMuted ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                            <span>Unmute</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Sound On</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Pillars Sub-cards */}
              <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 to-white border border-indigo-100">
                  <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm mb-1.5">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <span>Agentic AI &amp; Applied ML</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Multi-agent academic discovery (LiteratureAI), Springer research publication, and supervised/unsupervised ML benchmarking.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-sakura-50/80 to-white border border-sakura-100">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-1.5">
                    <Code2 className="w-4 h-4 text-rose-500" />
                    <span>Full-Stack Web Systems</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Proven internship delivery at Maincrafts Technology building NOIRÉ, MediLinks, and CampusCare with HTML/CSS/JS, Flask, Node.js, and SQLite/MongoDB.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEARNING GOALS */}
          {activeTab === 'goals' && (
            <div className="space-y-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Active Engineering Quests &amp; Learning Roadmap
              </p>
              {aboutJournal.learningGoals.map((goal, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/85 border border-indigo-100/90 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 leading-relaxed">{goal}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: CAREER & INTERNSHIP INTERESTS */}
          {activeTab === 'career' && (
            <div className="space-y-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Target Roles &amp; Industry Domains
              </p>
              {aboutJournal.careerInterests.map((item) => (
                <div
                  key={item.role}
                  className="p-4 rounded-2xl bg-white/85 border border-indigo-100/90 shadow-sm"
                >
                  <h3 className="font-serif font-bold text-base text-[#1e2b52]">{item.role}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          )}
          </div>

          {/* Decorative Lab/Study Club Companion Chibi Note at Bottom of Journal Card */}
          <div className="mt-7 pt-5 border-t border-indigo-100/80 flex items-center justify-between gap-4 bg-gradient-to-r from-skyworld-50/80 via-lavender-50/70 to-sakura-50/70 p-3.5 rounded-2xl border border-white">
            <div className="flex items-center gap-3">
              {/* Cute Chibi AI Lab Companion SVG */}
              <svg
                width="42"
                height="42"
                viewBox="0 0 56 56"
                fill="none"
                className="shrink-0 drop-shadow-sm animate-gentle-float"
                aria-hidden="true"
              >
                <circle cx="28" cy="28" r="26" fill="#fff0f6" stroke="#fbcfe8" strokeWidth="1.5" />
                <path d="M15 24 C14 34 16 42 19 45 L37 45 C40 42 42 34 41 24 Z" fill="#3b2f4a" />
                <path d="M17 48 C17 41 39 41 39 48 Z" fill="#4f46e5" />
                <path d="M25 41 L28 46 L31 41 Z" fill="#ffffff" />
                <circle cx="28" cy="27" r="10" fill="#ffe4c4" />
                <path d="M17 25 C17 16 23 13 28 13 C33 13 39 16 39 25 C36 21 33 20 28 22 C24 20 20 21 17 25 Z" fill="#3b2f4a" />
                <circle cx="36" cy="20" r="2.6" fill="#ff75a6" />
                <circle cx="24.5" cy="27.5" r="1.5" fill="#231f20" />
                <circle cx="31.5" cy="27.5" r="1.5" fill="#231f20" />
                <path d="M26 31.5 Q28 33 30 31.5" stroke="#7c4d3a" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </svg>
              <div>
                <p className="text-xs font-bold text-[#23315c]">
                  Verified Academic &amp; Industry Profile • SIT Nagpur (PRN: 24070521005)
                </p>
                <p className="text-[11.5px] text-slate-600">
                  Backed by 19 public GitHub repositories, Maincrafts Technology Internship (ID: MT4008), and Springer research.
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block font-handwriting text-lg text-rose-500 font-bold shrink-0">
              Keep building! 🌸
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
