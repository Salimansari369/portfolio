import React, { useEffect, useRef, useState } from 'react';
import {
  Rocket,
  Mail,
  ArrowRight,
  UserPlus,
  Github,
  Linkedin,
  User,
  GraduationCap,
  Settings,
  FolderOpen,
  MapPin,
  Sparkles,
  ExternalLink,
  BookOpen,
  Radio,
  MessageSquare,
  Activity,
  Grid,
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';
import { AudioTrack } from '../data/audioTracks';

interface HeroAndBentoSectionProps {
  personal: typeof PORTFOLIO_DATA.personal;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  reducedMotion: boolean;
  reset3DSignal?: number;
  tracks?: AudioTrack[];
  currentTrackIndex?: number;
  isPlayingMusic?: boolean;
  onSelectTrack?: (index: number) => void;
  onToggleMusic?: () => void;
  onNavigate?: (id: string) => void;
}

// 3D Tilt Card Helper Component for Bento Cards
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  reducedMotion?: boolean;
}> = ({ children, className = '', reducedMotion = false }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to +1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({ x: -y * 5, y: x * 5, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '800px',
      }}
      className="h-full"
    >
      <div
        style={{
          transform: reducedMotion
            ? 'none'
            : `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) ${
                tilt.isHovered ? 'translateY(-4px)' : 'translateY(0)'
              }`,
          transition: tilt.isHovered ? 'transform 0.12s ease-out' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`h-full will-change-transform ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export const HeroAndBentoSection: React.FC<HeroAndBentoSectionProps> = ({
  personal,
  projects,
  onSelectProject,
  reducedMotion,
  reset3DSignal = 0,
  onNavigate,
}) => {
  const featuredBentoProjects = projects.filter((p) => p.featuredInBento).slice(0, 3);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (id: string) => {
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
    <section id="home" className="relative w-full overflow-hidden select-none bg-[#020813]">
      {/* =====================================================================
          CYBERNETIC DITTO HERO SECTION (Exact 1:1 Match to User Mockup)
      ===================================================================== */}
      <div
        ref={heroContainerRef}
        className="relative w-full px-2 sm:px-4 lg:px-6 select-none pt-2 sm:pt-3 max-w-[1920px] mx-auto"
      >
        {/* Main 16:9 Cybernetic Visual Container - Stable & Clean, Nothing Moves on Top */}
        <div
          className="relative w-full aspect-[1024/576] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-sky-500/30 bg-[#020813] select-none"
        >
          {/* High-Definition 2K Master Visual with Complete Front Page Content */}
          <img
            src="/assets/hero-cyber-master-hd.jpg"
            alt="Salim Ansari - Engineering Ideas. Building Systems. Solving Problems. Computer Science Engineering AI/ML"
            fetchPriority="high"
            className="w-full h-full object-cover select-none pointer-events-none rounded-2xl sm:rounded-3xl"
          />

          {/* ===============================================================
              INTERACTIVE HOTSPOTS (Mapped to Exact Visual Coordinates)
              (Completely invisible until hovered/clicked - Zero moving elements on top of image)
          =============================================================== */}
          {/* 1. Header Navigation Links */}
          {/* SA Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            title="Salim Ansari - Home"
            aria-label="Salim Ansari - Home"
            style={{ left: '1.5%', top: '2.0%', width: '15.0%', height: '6.0%' }}
            className="absolute rounded-lg cursor-pointer hover:bg-sky-400/10 transition-colors z-20"
          />

          {/* About */}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
            title="About Me"
            style={{ left: '26.8%', top: '2.5%', width: '5.2%', height: '5.5%' }}
            className="absolute rounded-md cursor-pointer hover:bg-sky-400/10 transition-colors z-20"
          />

          {/* Projects */}
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
            title="Flagship Projects"
            style={{ left: '33.0%', top: '2.5%', width: '6.2%', height: '5.5%' }}
            className="absolute rounded-md cursor-pointer hover:bg-sky-400/10 transition-colors z-20"
          />

          {/* Research */}
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
            title="Research Initiatives"
            style={{ left: '40.5%', top: '2.5%', width: '6.7%', height: '5.5%' }}
            className="absolute rounded-md cursor-pointer hover:bg-sky-400/10 transition-colors z-20"
          />

          {/* Skills */}
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
            title="Technical Skills"
            style={{ left: '48.0%', top: '2.5%', width: '5.0%', height: '5.5%' }}
            className="absolute rounded-md cursor-pointer hover:bg-sky-400/10 transition-colors z-20"
          />

          {/* Experience */}
          <a
            href="#education"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('education');
            }}
            title="Experience & Education"
            style={{ left: '54.0%', top: '2.5%', width: '7.5%', height: '5.5%' }}
            className="absolute rounded-md cursor-pointer hover:bg-sky-400/10 transition-colors z-20"
          />

          {/* Contact */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            title="Get In Touch"
            style={{ left: '62.5%', top: '2.5%', width: '6.0%', height: '5.5%' }}
            className="absolute rounded-md cursor-pointer hover:bg-sky-400/10 transition-colors z-20"
          />

          {/* 2. Main Call to Action Buttons */}
          {/* Explore Projects ↗ */}
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
            title="Explore Flagship Projects"
            aria-label="Explore Flagship Projects"
            style={{ left: '7.2%', top: '53.8%', width: '12.3%', height: '5.6%' }}
            className="absolute rounded-xl cursor-pointer hover:bg-cyan-400/15 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] active:scale-95 transition-all z-20"
          />

          {/* Get in Touch ✉ */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            title="Get in Touch"
            aria-label="Get in Touch"
            style={{ left: '20.5%', top: '53.8%', width: '10.5%', height: '5.6%' }}
            className="absolute rounded-xl cursor-pointer hover:bg-white/10 hover:border-cyan-400/60 active:scale-95 transition-all z-20"
          />

          {/* ===============================================================
              HIGH-DEFINITION VECTOR TYPOGRAPHY & CARDS (Matching Screenshot 100%)
              - Crystal clear native typography (Zero AI misspelled artifacts)
              - No internship opportunities bar (Completely removed)
          =============================================================== */}
          {/* Tech Stack Ticker (Crisp JetBrains Mono) */}
          <div
            style={{ left: '6.8%', top: '60.6%' }}
            className="absolute z-20 flex items-center gap-2 font-mono text-[9px] sm:text-[10.5px] text-hd-sharp"
          >
            <span className="text-cyan-400 font-black">&gt;_</span>
            <span className="tracking-wider text-slate-200 font-semibold drop-shadow-sm">
              PYTHON / C++ / JAVASCRIPT / FASTAPI / AI &amp; ML / DOCKER
            </span>
          </div>

          {/* Research Focus Badge Pill */}
          <div
            style={{ left: '6.8%', top: '64.5%' }}
            className="absolute z-20 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#051126]/95 border border-sky-500/50 text-cyan-300 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.25)] text-hd-sharp"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>RESEARCH • MULTI-AGENT SYSTEMS • SPACE COMMUNICATION</span>
          </div>

          {/* Two Side-by-Side Bento Boxes: Selected Projects & Research Highlight */}
          <div
            style={{ left: '6.8%', top: '69.0%', width: '40.0%', height: '24.5%' }}
            className="absolute z-20 grid grid-cols-2 gap-2.5 text-hd-sharp"
          >
            {/* Card 1: SELECTED PROJECTS */}
            <div className="bg-[#020b1c]/95 backdrop-blur-md border border-sky-500/40 rounded-xl p-2.5 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-sky-900/60">
                  <span className="text-[9.5px] sm:text-[10.5px] font-mono font-extrabold text-white tracking-wider flex items-center gap-1.5">
                    <FolderOpen className="w-3 h-3 text-cyan-400" />
                    SELECTED PROJECTS
                  </span>
                  <button
                    type="button"
                    onClick={() => scrollToSection('projects')}
                    className="px-1.5 py-0.5 rounded bg-[#061838] border border-sky-500/40 text-[8px] sm:text-[9px] font-mono text-slate-200 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                  >
                    View all
                  </button>
                </div>

                <div className="space-y-1">
                  {/* Item 1: HCMNCO */}
                  <div
                    onClick={() => {
                      const proj = projects.find((p) => p.id === 'literature-ai' || p.title.toLowerCase().includes('agentic')) || projects[0];
                      onSelectProject(proj);
                    }}
                    role="button"
                    tabIndex={0}
                    className="flex items-start gap-1.5 px-1.5 py-0.5 rounded hover:bg-sky-500/20 transition-colors cursor-pointer text-[8.5px] sm:text-[9.5px] leading-tight"
                  >
                    <Rocket className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="truncate">
                      <span className="font-bold text-white">HCMNCO</span>
                      <span className="text-slate-300"> — Agentic AI for Space Networks</span>
                    </div>
                  </div>

                  {/* Item 2: LiteratureAI (Active Selected Blue State) */}
                  <div
                    onClick={() => {
                      const proj = projects.find((p) => p.id === 'literature-ai') || projects[0];
                      onSelectProject(proj);
                    }}
                    role="button"
                    tabIndex={0}
                    className="flex items-start gap-1.5 px-1.5 py-0.5 rounded bg-gradient-to-r from-sky-950/80 via-[#0a1e42]/80 to-transparent border border-sky-500/40 cursor-pointer text-[8.5px] sm:text-[9.5px] leading-tight shadow-sm"
                  >
                    <Grid className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
                    <div className="truncate">
                      <span className="font-bold text-white">LiteratureAI</span>
                      <span className="text-slate-300"> — Automated Review Assistant</span>
                    </div>
                  </div>

                  {/* Item 3: MediLink */}
                  <div
                    onClick={() => {
                      const proj = projects.find((p) => p.id === 'medilinks') || projects[1];
                      onSelectProject(proj);
                    }}
                    role="button"
                    tabIndex={0}
                    className="flex items-start gap-1.5 px-1.5 py-0.5 rounded hover:bg-sky-500/20 transition-colors cursor-pointer text-[8.5px] sm:text-[9.5px] leading-tight"
                  >
                    <Activity className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="truncate">
                      <span className="font-bold text-white">MediLink</span>
                      <span className="text-slate-300"> — Healthcare Assistance Platform</span>
                    </div>
                  </div>

                  {/* Item 4: Campus Complaints */}
                  <div
                    onClick={() => {
                      const proj = projects.find((p) => p.id === 'campus-care') || projects[2];
                      onSelectProject(proj);
                    }}
                    role="button"
                    tabIndex={0}
                    className="flex items-start gap-1.5 px-1.5 py-0.5 rounded hover:bg-sky-500/20 transition-colors cursor-pointer text-[8.5px] sm:text-[9.5px] leading-tight"
                  >
                    <MessageSquare className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    <div className="truncate">
                      <span className="font-bold text-white">Campus Complaints</span>
                      <span className="text-slate-300"> — Redressal System</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: RESEARCH HIGHLIGHT */}
            <div className="relative overflow-hidden bg-[#020b1c]/95 backdrop-blur-md border border-sky-500/40 rounded-xl p-2.5 flex flex-col justify-between shadow-2xl">
              {/* Background Constellation Mesh */}
              <svg className="absolute -right-2 -bottom-2 w-24 h-24 pointer-events-none opacity-35 text-cyan-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <line x1="20" y1="80" x2="60" y2="60" />
                <line x1="60" y1="60" x2="90" y2="85" />
                <line x1="60" y1="60" x2="50" y2="20" />
                <line x1="50" y1="20" x2="85" y2="35" />
                <line x1="85" y1="35" x2="90" y2="85" />
                <circle cx="20" cy="80" r="3" fill="#38bdf8" />
                <circle cx="60" cy="60" r="3" fill="#38bdf8" />
                <circle cx="90" cy="85" r="3" fill="#38bdf8" />
                <circle cx="50" cy="20" r="3" fill="#38bdf8" />
                <circle cx="85" cy="35" r="3" fill="#38bdf8" />
              </svg>

              <div className="relative z-10">
                <div className="flex items-center gap-1.5 pb-1 mb-1 border-b border-sky-900/60">
                  <Radio className="w-3 h-3 text-cyan-400" />
                  <span className="text-[9.5px] sm:text-[10.5px] font-mono font-extrabold text-white tracking-wider">
                    RESEARCH HIGHLIGHT
                  </span>
                </div>
                <h4 className="font-sans font-bold text-white text-[9.5px] sm:text-[10.5px] leading-snug mt-1">
                  Graph Neural Network Assisted Mean-Field Reinforcement Learning for 6G
                </h4>
                <p className="text-slate-400 text-[8px] sm:text-[9px] leading-tight mt-1 line-clamp-2">
                  Exploring scalable intelligent decision-making in next-generation wireless networks.
                </p>
              </div>

              <div className="relative z-10 pt-1">
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white text-[8px] sm:text-[9px] font-mono font-bold transition-all cursor-pointer"
                >
                  <span>View Research</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Tech Tags */}
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
            title="AI & Machine Learning"
            style={{ left: '86.5%', top: '25.0%', width: '10.0%', height: '4.3%' }}
            className="absolute rounded-lg cursor-pointer hover:bg-sky-400/15 transition-colors z-20"
          />
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
            title="Agentic AI"
            style={{ left: '86.5%', top: '29.8%', width: '10.0%', height: '4.3%' }}
            className="absolute rounded-lg cursor-pointer hover:bg-sky-400/15 transition-colors z-20"
          />
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
            title="Backend Systems"
            style={{ left: '86.5%', top: '34.5%', width: '10.0%', height: '4.3%' }}
            className="absolute rounded-lg cursor-pointer hover:bg-sky-400/15 transition-colors z-20"
          />
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
            title="Research"
            style={{ left: '86.5%', top: '39.2%', width: '10.0%', height: '4.3%' }}
            className="absolute rounded-lg cursor-pointer hover:bg-sky-400/15 transition-colors z-20"
          />
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
            title="UI/UX Engineering"
            style={{ left: '86.5%', top: '44.0%', width: '10.0%', height: '4.0%' }}
            className="absolute rounded-lg cursor-pointer hover:bg-sky-400/15 transition-colors z-20"
          />

          {/* CURRENT FOCUS Card */}
          <div
            title="Current Focus: AI-powered applications (In Progress)"
            style={{ left: '69.8%', top: '80.5%', width: '18.4%', height: '11.7%' }}
            className="absolute rounded-xl pointer-events-none z-20"
          />
        </div>


        {/* Accessible Mobile Fallback Row (< 640px) */}
        <div className="sm:hidden px-4 pt-4 pb-2 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0072ff] to-[#00d2ff] text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Explore Projects ↗</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="flex-1 py-3 px-4 rounded-xl bg-[#071326] text-cyan-300 border border-cyan-500/40 font-bold text-xs shadow-xs flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch ✉</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          BENTO OVERVIEW ROW WITH 3D TILT CARDS (Cybernetic Dark Theme)
      ===================================================================== */}
      <div
        id="overview-bento"
        className="relative z-20 max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-20"
      >
        {/* Ambient Subtle Cyber Glows in Background */}
        <div className="absolute -top-10 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-[10%] w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        {/* Top Header Row for Bento: Overview Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 px-1">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-400 text-xs font-bold tracking-wider uppercase shadow-2xs mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXECUTIVE SNAPSHOT • PORTFOLIO OVERVIEW</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white">
              Quick Portfolio Snapshot
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 max-w-xl">
              A curated overview of my engineering journey, technical toolkit, academic milestones, and active projects.
            </p>
          </div>
        </div>

        {/* 3-Column Summary Cards: About Me | Education | Technical Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* CARD 1: ABOUT ME (Interactive 3D Tilt Card) */}
          <TiltCard reducedMotion={reducedMotion}>
            <div className="bg-[#050f1e]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full border border-sky-500/20 shadow-xl hover:border-sky-400/40 hover:shadow-cyan-500/10 transition-all">
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-sky-900/50">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-sky-950 text-cyan-400 flex items-center justify-center border border-sky-500/30 shadow-inner">
                      <User className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white leading-tight">About Me</h3>
                      <span className="text-[11px] font-semibold text-cyan-400">Profile &amp; Vision</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('about')}
                    data-cursor-interactive="true"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-cyan-400 hover:bg-sky-950 border border-sky-500/40 transition-colors cursor-pointer"
                  >
                    <span>More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Profile Identity Row */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-tr from-cyan-500/30 via-sky-600/20 to-blue-600/30 border border-sky-500/40 shadow-lg shrink-0">
                    <img
                      src="/assets/salim-photo.png"
                      alt="Salim Ansari"
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full rounded-xl object-cover"
                    />
                    <span className="absolute -bottom-1 -right-1 px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold shadow-2xs">
                      Active
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-white leading-tight">
                      Salim Ansari
                    </h4>
                    <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                      AI &amp; Full-Stack Developer
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      SIT Nagpur • 2024–2028 Session
                    </p>
                  </div>
                </div>

                <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-slate-300">
                  Third-year Computer Science Engineering (AI &amp; ML) student at Symbiosis Institute of Technology. I build autonomous AI workflows, full-stack web platforms, and practical software systems that solve real problems.
                </p>
              </div>

              {/* Quick High-Impact Stat Badges */}
              <div className="mt-5 pt-3.5 border-t border-sky-900/50 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-950/80 text-cyan-300 border border-sky-500/30">
                  <span>⚡ 5+ Shipped Projects</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-500/30">
                  <span>🧠 Agentic AI Focus</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  <span>📍 SIT Nagpur</span>
                </span>
              </div>
            </div>
          </TiltCard>

          {/* CARD 2: EDUCATION (Interactive 3D Tilt Card with Real SIT Campus Dome) */}
          <TiltCard reducedMotion={reducedMotion}>
            <div className="bg-[#050f1e]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full border border-sky-500/20 shadow-xl hover:border-sky-400/40 hover:shadow-cyan-500/10 transition-all">
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-sky-900/50">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-sky-950 text-cyan-400 flex items-center justify-center border border-sky-500/30 shadow-inner">
                      <GraduationCap className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white leading-tight">Education</h3>
                      <span className="text-[11px] font-semibold text-cyan-400">Academic Journey</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('education')}
                    data-cursor-interactive="true"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-cyan-400 hover:bg-sky-950 border border-sky-500/40 transition-colors cursor-pointer"
                  >
                    <span>More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Real SIT Nagpur Campus Dome Photograph */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-4 border border-sky-500/30 shadow-sm group/dome bg-slate-900">
                  <img
                    src="/assets/sit-campus-dome.jpg"
                    alt="Symbiosis Institute of Technology Nagpur Iconic Campus Dome"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/dome:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#050f1e]/90 backdrop-blur-md text-cyan-200 border border-cyan-500/30">
                    SIT Nagpur Iconic Campus Dome
                  </span>
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-2xs">
                    NAAC A++
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-white leading-snug">
                  Symbiosis Institute of Technology
                </h4>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  B.Tech in Computer Science &amp; Engineering
                </p>
                <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                  Third Year (Batch 2024 – 2028) • AI/ML Specialization
                </p>
              </div>

              {/* Coursework & Campus Location */}
              <div className="mt-5 pt-3.5 border-t border-sky-900/50 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Nagpur, Maharashtra</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-300 bg-sky-950/90 px-3 py-1 rounded-full border border-sky-500/40 font-bold shadow-2xs">
                  PRN: 24070521005
                </span>
              </div>
            </div>
          </TiltCard>

          {/* CARD 3: TECHNICAL SKILLS (Interactive 3D Tilt Card) */}
          <TiltCard reducedMotion={reducedMotion}>
            <div className="bg-[#050f1e]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full border border-sky-500/20 shadow-xl hover:border-sky-400/40 hover:shadow-cyan-500/10 transition-all">
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-sky-900/50">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-sky-950 text-cyan-400 flex items-center justify-center border border-sky-500/30 shadow-inner">
                      <Settings className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white leading-tight">Technical Skills</h3>
                      <span className="text-[11px] font-semibold text-cyan-400">Core Toolkit</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('skills')}
                    data-cursor-interactive="true"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-cyan-400 hover:bg-sky-950 border border-sky-500/40 transition-colors cursor-pointer"
                  >
                    <span>More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Categorized Skills Grid */}
                <div className="space-y-3">
                  {/* Languages */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Languages
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-sky-500/20 shadow-2xs">
                        <span className="text-xs">🐍</span>
                        <span className="text-xs font-bold text-slate-200 truncate">Python</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-950/80 border border-blue-500/30 shadow-2xs">
                        <span className="text-[10px] font-black text-blue-400">C++</span>
                        <span className="text-xs font-bold text-blue-200 truncate">C &amp; C++</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/30 shadow-2xs">
                        <span className="text-[10px] font-black text-amber-400">JS</span>
                        <span className="text-xs font-bold text-amber-200 truncate">JavaScript</span>
                      </div>
                    </div>
                  </div>

                  {/* AI & Machine Learning */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      AI &amp; Machine Learning
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-950/80 border border-sky-500/30 shadow-2xs">
                        <span className="text-xs">🤖</span>
                        <span className="text-xs font-bold text-cyan-200 truncate">Agentic AI &amp; RAG</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 shadow-2xs">
                        <span className="text-xs">🎙️</span>
                        <span className="text-xs font-bold text-cyan-200 truncate">Whisper &amp; PyMuPDF</span>
                      </div>
                    </div>
                  </div>

                  {/* Web & Frameworks */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Web &amp; Frameworks
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 shadow-2xs">
                        <span className="text-xs">⚛️</span>
                        <span className="text-xs font-bold text-cyan-200 truncate">React</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 shadow-2xs">
                        <span className="text-xs">🟢</span>
                        <span className="text-xs font-bold text-emerald-200 truncate">Node.js</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 shadow-2xs">
                        <span className="text-xs">🚀</span>
                        <span className="text-xs font-bold text-slate-200 truncate">FastAPI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools row */}
              <div className="mt-5 pt-3.5 border-t border-sky-900/50 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">Tools &amp; Version Control:</span>
                <span className="font-mono text-[11px] font-bold text-cyan-300 bg-sky-950 px-2 py-0.5 rounded-md border border-sky-500/40">
                  Git • 19+ Repos
                </span>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* =====================================================================
            FEATURED PROJECTS STRIP (Browser Mockups + 3D Tilt Cards)
        ===================================================================== */}
        <div className="mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 px-1">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-sky-950 text-cyan-400 flex items-center justify-center border border-sky-500/30 shadow-inner">
                <FolderOpen className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-serif font-bold text-2xl text-white">Featured Projects</h3>
                <p className="text-xs text-slate-400 font-medium">Production platforms and academic systems</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              data-cursor-interactive="true"
              className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-cyan-300 bg-sky-950 hover:bg-sky-900 border border-sky-500/40 shadow-2xs transition-all cursor-pointer"
            >
              <span>View All 5 Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredBentoProjects.map((proj) => (
              <TiltCard key={proj.id} reducedMotion={reducedMotion}>
                <div
                  onClick={() => onSelectProject(proj)}
                  role="button"
                  tabIndex={0}
                  data-cursor-interactive="true"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject(proj);
                    }
                  }}
                  className="bg-[#050f1e]/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full text-left group cursor-pointer border border-sky-500/20 shadow-xl hover:border-sky-400/50 hover:shadow-cyan-500/10 transition-all"
                >
                  <div>
                    {/* Browser Mockup Top Window Bar */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-900/40">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400/80 bg-sky-950/80 px-2 py-0.5 rounded-md truncate max-w-[130px] border border-sky-500/20">
                        {proj.id}.dev
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-950 text-cyan-300 border border-sky-500/30">
                        {proj.category}
                      </span>
                    </div>

                    {/* High-Resolution Screenshot Frame */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] my-2 border border-sky-500/20 bg-slate-900 group-hover:border-sky-400/40 transition-colors">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <h4 className="font-serif font-bold text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mt-3">
                      {proj.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-[13px] text-slate-300 line-clamp-2 leading-relaxed">
                      {proj.shortDescription}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3 min-h-[28px]">
                      {proj.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[10.5px] font-semibold bg-sky-950/80 text-sky-200 border border-sky-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold text-slate-500">
                          +{proj.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dual Action Bar: Case Study & Direct GitHub Link */}
                  <div className="mt-4 pt-3.5 border-t border-sky-900/50 flex items-center justify-between text-xs font-semibold">
                    <span className="inline-flex items-center gap-1 text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-black text-cyan-300 border border-sky-500/30 text-[11px] font-medium transition-colors"
                      title="Open GitHub Repository in new tab"
                    >
                      <Github className="w-3 h-3" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
