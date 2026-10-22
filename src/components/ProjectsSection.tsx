import React, { useState } from 'react';
import {
  FolderGit2,
  Github,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Star,
  FileDown,
  Cpu,
  Mic,
  Database,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [spotlightScreenIdx, setSpotlightScreenIdx] = useState<number>(0);

  const categories = [
    'All',
    'AI & Machine Learning',
    'Full-Stack Web',
    'Frontend & Brand UI',
    'Systems & Academic Labs',
  ];

  const flagshipProject = projects.find((p) => p.isFlagshipSpotlight) || projects[0];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const showFlagshipBanner =
    flagshipProject &&
    (activeCategory === 'All' || activeCategory === flagshipProject.category);

  // When the flagship spotlight banner is displayed at the top, avoid repeating it immediately below
  // in the grid, resulting in a perfectly balanced, symmetrical 2x2 grid with zero awkward empty slots.
  const gridProjects =
    showFlagshipBanner && activeCategory === 'All'
      ? filteredProjects.filter((p) => p.id !== flagshipProject.id)
      : filteredProjects;

  const spotlightVisuals = flagshipProject
    ? [
        ...(flagshipProject.realScreenshots || []).map((url, idx) => ({
          url,
          label:
            flagshipProject.screenshotLabels?.[idx] ||
            `Live Screen ${idx + 1}`,
        })),
        {
          url: flagshipProject.image,
          label: 'Architecture Overview',
        },
      ]
    : [];

  const activeSpotlightVisual =
    spotlightVisuals[spotlightScreenIdx] || spotlightVisuals[0];

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1560px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sakura-100 text-rose-900 text-xs font-bold tracking-wider uppercase border border-sakura-200 mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Chapter 04 • Verified GitHub Repositories</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#1b274b]">
            Projects &amp; Engineering Case Studies
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Highlighting Salim&apos;s flagship Agentic AI research platform (<strong>LiteratureAI</strong>) alongside full-stack web applications, healthcare portals, and systems engineering repositories.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#7e60ed] to-[#6366f1] text-white shadow-md'
                  : 'bg-white/85 text-slate-700 hover:bg-indigo-50 border border-indigo-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          FLAGSHIP GITHUB PROJECT SPOTLIGHT: LITERATURE AI
          (https://github.com/Salimansari369/Automated-Research-Review-Assistant)
      ===================================================================== */}
      {showFlagshipBanner && flagshipProject && (
        <div className="mb-12 rounded-[28px] bg-white border border-indigo-100 shadow-lg">
          <div className="rounded-[26px] bg-white p-5 sm:p-7 lg:p-8">
            {/* Top Spotlight Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-indigo-100">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 text-white text-xs font-extrabold tracking-wide uppercase shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>Flagship AI/ML Spotlight</span>
                </span>
                <a
                  href={flagshipProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e294b] hover:bg-[#111936] text-white font-mono text-xs font-semibold transition-colors shadow-sm"
                >
                  <Github className="w-3.5 h-3.5 text-skyworld-200" />
                  <span>Salimansari369/Automated-Research-Review-Assistant</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
                </a>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                  0% Hallucination • Grounded RAG
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50/90 px-3 py-1 rounded-full border border-indigo-200/70">
                <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                <span>Python 3.10+ • Gradio 6.0 SPA • PyMuPDF • OpenAI Whisper • Groq Llama-3.3-70B</span>
              </div>
            </div>

            {/* Main 12-Column Spotlight Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
              {/* LEFT 7 COLUMNS: Interactive Multi-Screen & Architecture Showcase */}
              <div className="lg:col-span-7 space-y-3.5">
                <div
                  onClick={() => onSelectProject(flagshipProject)}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border-2 border-indigo-100 shadow-md group cursor-pointer"
                >
                  <img
                    src={activeSpotlightVisual?.url || flagshipProject.image}
                    alt={`${flagshipProject.title} — ${activeSpotlightVisual?.label}`}
                    className="w-full h-full object-contain bg-white group-hover:scale-[1.02] transition-transform duration-500"
                  />

                  {/* Top Floating Screen Label */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-semibold border border-white/15 shadow">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
                      <span>
                        Screen {spotlightScreenIdx + 1}/{spotlightVisuals.length}:{' '}
                        {activeSpotlightVisual?.label}
                      </span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-indigo-600/90 backdrop-blur-md text-white text-[11px] font-bold shadow">
                      Click to Enlarge Case Study
                    </span>
                  </div>
                </div>

                {/* Interactive Screen Switcher Pills */}
                <div className="bg-indigo-50/75 rounded-2xl p-3 border border-indigo-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Interactive GitHub Repository Visuals &amp; Architecture Diagrams:</span>
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-600">
                      Click any tab to preview
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {spotlightVisuals.map((vis, idx) => {
                      const isSelected = idx === spotlightScreenIdx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSpotlightScreenIdx(idx)}
                          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#7e60ed] to-[#6366f1] text-white shadow-sm'
                              : 'bg-white text-slate-700 hover:bg-indigo-100/70 border border-indigo-100'
                          }`}
                        >
                          <span className="font-mono text-[10px] opacity-80">0{idx + 1}</span>
                          <span>{vis.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 6-Stage Autonomous Pipeline Strip */}
                {flagshipProject.pipelineStages && (
                  <div className="rounded-2xl bg-white/90 border border-indigo-100 p-4 shadow-sm">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 mb-2.5 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-indigo-600" />
                      <span>6-Stage Autonomous Agentic Literature Review Pipeline</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {flagshipProject.pipelineStages.map((stage, i) => (
                        <div
                          key={i}
                          className="px-2.5 py-2 rounded-xl bg-gradient-to-br from-indigo-50/80 to-purple-50/50 border border-indigo-100 text-[11.5px] font-semibold text-[#1e294b] flex items-center gap-1.5"
                        >
                          <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                          <span className="truncate">{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT 5 COLUMNS: Project Title, Metrics, Problem/Solution & Direct GitHub/Report Actions */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#182346] leading-tight">
                    Automated Literature Review Assistant ({flagshipProject.title}) 🌌
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-indigo-700">
                    {flagshipProject.subtitle}
                  </p>
                  {flagshipProject.academicContext && (
                    <p className="mt-2 text-xs text-slate-600 bg-amber-50/90 border border-amber-200/80 rounded-xl px-3 py-2 font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-amber-700 inline mr-1.5 -mt-0.5" />
                      {flagshipProject.academicContext}
                    </p>
                  )}
                </div>

                {/* 4 Architecture Highlight Metric Cards */}
                {flagshipProject.architectureHighlights && (
                  <div className="grid grid-cols-2 gap-2.5">
                    {flagshipProject.architectureHighlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-white border border-indigo-100 shadow-sm"
                      >
                        <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
                          {item.label}
                        </p>
                        <p className="font-serif font-extrabold text-base sm:text-lg text-indigo-700 mt-0.5">
                          {item.value}
                        </p>
                        <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Overview Description */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-700 leading-relaxed space-y-2">
                  <p>
                    <strong className="text-[#1b274b]">Engineering Architecture:</strong>{' '}
                    {flagshipProject.solutionOverview}
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="space-y-1.5">
                  {flagshipProject.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {flagshipProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-[#eef2ff] text-[#2e3f78] font-semibold text-xs border border-indigo-200/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action CTAs: GitHub Repo, Official 34-Page Report PDF, and Full Case Study Modal */}
                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  <a
                    href={flagshipProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e294b] hover:bg-[#111936] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <Github className="w-4 h-4 text-amber-300" />
                    <span>Explore on GitHub</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onSelectProject(flagshipProject)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#7e60ed] to-[#6366f1] hover:from-[#6d4de4] hover:to-[#5254e6] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5 text-amber-200" />
                    <span>Full Case Study &amp; 7 Screens</span>
                  </button>

                  {flagshipProject.reportPdfUrl && (
                    <a
                      href={flagshipProject.reportPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200 shadow-sm transition-all"
                    >
                      <FileDown className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Official 34-Page Report (PDF)</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Large Visual Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {gridProjects.map((project, index) => {
          const isSingleCard = gridProjects.length === 1;
          return (
            <article
              key={project.id}
              className={`anime-glass-card anime-glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between group ${
                isSingleCard ? 'lg:col-span-2' : ''
              } ${
                project.isFlagshipSpotlight
                  ? 'ring-2 ring-indigo-400/80 shadow-lg'
                  : ''
              }`}
            >
            <div>
              {/* Top Visual Banner */}
              <div
                onClick={() => onSelectProject(project)}
                className="relative aspect-[16/9] overflow-hidden bg-indigo-100 cursor-pointer"
              >
                <img
                  src={project.realScreenshots?.[0] || project.image}
                  alt={`${project.title} — ${project.subtitle}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141e3c]/90 via-[#141e3c]/30 to-transparent" />

                {/* Top Category & Number Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {project.isFlagshipSpotlight && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 fill-slate-950" />
                        <span>FLAGSHIP</span>
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-[#22305b] shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-indigo-950/80 backdrop-blur-md text-skyworld-100 font-mono text-[11px] font-semibold">
                    0{index + 1} • {project.realScreenshots?.length || 1} UI Screens
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="font-serif font-extrabold text-2xl sm:text-3xl tracking-tight drop-shadow">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-skyworld-100 font-medium">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body: Problem Statement, Solution & Highlights */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-1">
                      Problem Statement
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed line-clamp-4">
                      {project.problemStatement}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 mb-1">
                      Solution Built
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed line-clamp-4">
                      {project.solutionOverview}
                    </p>
                  </div>
                </div>

                {/* Key Highlights Preview */}
                <div className="space-y-1.5">
                  {project.keyHighlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer: Technologies & Action Buttons */}
            <div className="px-6 pb-6 pt-3 border-t border-indigo-100/80 space-y-4">
              <div className="flex flex-wrap items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500 mr-1" />
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#eef2ff] text-[#2e3f78] font-semibold text-xs border border-indigo-200/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#7e60ed] to-[#6366f1] hover:from-[#6d4de4] hover:to-[#5254e6] text-white text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Case Study &amp; Live Screenshots</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1e294b] hover:bg-[#111936] text-white font-semibold text-xs shadow-sm transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100 shadow-sm transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
      </div>
    </section>
  );
};
