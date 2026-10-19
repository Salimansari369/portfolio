import React, { useState } from 'react';
import {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Database,
  Wrench,
  Layers,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { SkillItem } from '../data/portfolioData';

interface SkillsSectionProps {
  skills: SkillItem[];
}

const SKILL_CATEGORIES: Array<{
  name: SkillItem['category'];
  icon: React.ReactNode;
}> = [
  { name: 'Programming Languages', icon: <Code2 className="w-4 h-4" /> },
  { name: 'Frontend Development', icon: <Layout className="w-4 h-4" /> },
  { name: 'Backend and APIs', icon: <Server className="w-4 h-4" /> },
  { name: 'AI/ML and Data Science', icon: <BrainCircuit className="w-4 h-4" /> },
  { name: 'Databases', icon: <Database className="w-4 h-4" /> },
  { name: 'Developer Tools', icon: <Wrench className="w-4 h-4" /> },
  { name: 'Other Technical Skills', icon: <Layers className="w-4 h-4" /> },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [statusFilter, setStatusFilter] = useState<
    'All' | 'Core / Proficient' | 'Currently Learning'
  >('All');

  const visibleCategories =
    selectedCategory === 'All Categories'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.name === selectedCategory);

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1560px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender-100 text-indigo-800 text-xs font-bold tracking-wider uppercase border border-lavender-200 mb-3">
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
            <span>Chapter 03 • Technical Toolkit</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#1b274b]">
            Technical Skills &amp; Stack
          </h2>
        </div>

        {/* Status Legend / Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {(['All', 'Core / Proficient', 'Currently Learning'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#25335e] text-white border-[#25335e] shadow-sm'
                  : 'bg-white/85 text-slate-600 border-indigo-100 hover:bg-indigo-50'
              }`}
            >
              {status === 'Core / Proficient' && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
              {status === 'Currently Learning' && (
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{status}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setSelectedCategory('All Categories')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            selectedCategory === 'All Categories'
              ? 'bg-gradient-to-r from-[#7e60ed] to-[#6366f1] text-white shadow-md'
              : 'bg-white/85 text-slate-700 hover:bg-indigo-50 border border-indigo-100'
          }`}
        >
          All Categories ({skills.length})
        </button>

        {SKILL_CATEGORIES.map((cat) => {
          const count = skills.filter((s) => s.category === cat.name).length;
          const active = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                active
                  ? 'bg-gradient-to-r from-[#7e60ed] to-[#6366f1] text-white shadow-md'
                  : 'bg-white/85 text-slate-700 hover:bg-indigo-50 border border-indigo-100'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  active ? 'bg-white/25 text-white' : 'bg-indigo-50 text-indigo-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Categorized Skill Cards Grid */}
      <div className="space-y-8">
        {visibleCategories.map((categoryObj) => {
          const categorySkills = skills.filter(
            (skill) =>
              skill.category === categoryObj.name &&
              (statusFilter === 'All' || skill.status === statusFilter)
          );

          if (categorySkills.length === 0) return null;

          return (
            <div key={categoryObj.name} className="anime-glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-indigo-100/80">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-indigo-100/90 text-[#304178] flex items-center justify-center shadow-inner">
                    {categoryObj.icon}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#1b274b]">
                    {categoryObj.name}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => {
                  const isLearning = skill.status === 'Currently Learning';
                  return (
                    <div
                      key={skill.name}
                      className="group rounded-2xl p-4 bg-white/90 hover:bg-white border border-indigo-100/80 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${skill.badgeColor} border flex items-center justify-center text-sm font-extrabold shadow-sm group-hover:scale-105 transition-transform`}
                            >
                              {skill.shortIcon}
                            </span>
                            <h4 className="font-bold text-sm sm:text-[15px] text-[#1d294e] group-hover:text-indigo-700 transition-colors">
                              {skill.name}
                            </h4>
                          </div>

                          <span
                            className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${
                              isLearning
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isLearning ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                            />
                            {isLearning ? 'Exploring' : 'Proficient'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
