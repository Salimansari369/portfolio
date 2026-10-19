import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle2,
  Github,
  ExternalLink,
  Layers,
  Sparkles,
  Image as ImageIcon,
  FileDown,
  Database,
  BookOpen,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenQuickCustomize: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const [activePreview, setActivePreview] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setActivePreview(project.realScreenshots?.[0] || project.image);
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const allVisuals = [
    ...(project.realScreenshots || []).map((url, idx) => ({
      url,
      label: project.screenshotLabels?.[idx] || `Screen ${idx + 1}`,
    })),
    {
      url: project.image,
      label: 'Anime Concept Art',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-indigo-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Interactive Screenshot / Visual Showcase */}
        <div className="relative h-64 sm:h-88 w-full overflow-hidden bg-slate-950">
          <img
            src={activePreview || project.image}
            alt={project.title}
            className="w-full h-full object-contain bg-slate-950"
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/50 to-transparent pointer-events-none" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500 text-white mb-1.5">
                {project.category}
              </span>
              <h2
                id="modal-project-title"
                className="font-serif font-extrabold text-2xl sm:text-3xl"
              >
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-skyworld-100">{project.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Thumbnail Switcher for Real Project Screenshots + Anime Cover */}
        {allVisuals.length > 1 && (
          <div className="px-6 py-3 bg-indigo-50/70 border-b border-indigo-100 flex items-center gap-3 overflow-x-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-900 shrink-0">
              <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Visuals ({allVisuals.length}):</span>
            </span>
            {allVisuals.map((vis, idx) => {
              const isSelected = (activePreview || project.image) === vis.url;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePreview(vis.url)}
                  className={`relative h-14 w-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-300 scale-105'
                      : 'border-white opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={vis.url}
                    alt={`${project.title} — ${vis.label}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-indigo-950/85 text-[8.5px] text-white font-semibold text-center px-1 truncate">
                    {vis.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {project.academicContext && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-slate-700 font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{project.academicContext}</span>
            </div>
          )}

          {project.architectureHighlights && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.architectureHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </p>
                  <p className="font-serif font-extrabold text-base text-indigo-700 mt-0.5">
                    {item.value}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{item.detail}</p>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-1.5">
                Problem Statement
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-1.5">
                Engineering Solution
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.solutionOverview}
              </p>
            </div>
          </div>

          {project.pipelineStages && (
            <div>
              <h3 className="font-serif font-bold text-base text-[#1b274b] mb-2.5 flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-600" />
                <span>6-Stage Autonomous Agentic Pipeline</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {project.pipelineStages.map((stage, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs font-semibold text-[#1e294b]"
                  >
                    {stage}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Highlights */}
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1b274b] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Key Implementation Highlights</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyHighlights.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-indigo-100/70 text-xs sm:text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Technologies Used</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-900 font-semibold text-xs border border-indigo-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Repository & Live Link Actions */}
          <div className="pt-4 border-t border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e294b] hover:bg-[#111936] text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Open GitHub Repository</span>
              </a>

              {project.reportPdfUrl && (
                <a
                  href={project.reportPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs sm:text-sm font-bold shadow-sm transition-colors"
                >
                  <FileDown className="w-4 h-4 text-indigo-600" />
                  <span>Official 34-Page Report (PDF)</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7e60ed] to-[#6366f1] text-white text-xs sm:text-sm font-semibold shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Live Deployment</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer self-end sm:self-auto"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
