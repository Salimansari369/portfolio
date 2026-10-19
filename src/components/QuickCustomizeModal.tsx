import React from 'react';
import { X, RotateCcw, Save, SlidersHorizontal } from 'lucide-react';
import { PORTFOLIO_DATA, SemesterRecord } from '../data/portfolioData';

interface QuickCustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  personal: typeof PORTFOLIO_DATA.personal;
  semesters: SemesterRecord[];
  onUpdatePersonal: (updated: Partial<typeof PORTFOLIO_DATA.personal>) => void;
  onUpdateSemesterSgpa: (index: number, newSgpa: string) => void;
  onResetDefaults: () => void;
}

export const QuickCustomizeModal: React.FC<QuickCustomizeModalProps> = ({
  isOpen,
  onClose,
  personal,
  semesters,
  onUpdatePersonal,
  onUpdateSemesterSgpa,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl bg-white border border-indigo-100 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-indigo-100">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </span>
            <div>
              <h2
                id="customize-modal-title"
                className="font-serif font-bold text-xl text-[#1b274b]"
              >
                Quick Portfolio Record Editor
              </h2>
              <p className="text-xs text-slate-500">
                Changes save automatically to your browser or can be permanently set in{' '}
                <code>src/data/portfolioData.ts</code>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close customize modal"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contact & Profile Links */}
        <div className="space-y-5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
              1. Contact &amp; Social Profile Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={personal.email}
                  onChange={(e) => onUpdatePersonal({ email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-indigo-100 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={personal.githubUrl}
                  onChange={(e) => onUpdatePersonal({ githubUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-indigo-100 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={personal.linkedinUrl}
                  onChange={(e) => onUpdatePersonal({ linkedinUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-indigo-100 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Semester SGPA Editor */}
          <div className="pt-4 border-t border-indigo-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              2. Verified Semester-Wise SGPA (SIT Nagpur)
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Enter your official SGPA for completed semesters (e.g., <code>8.65</code>).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {semesters.map((sem, idx) => (
                <div
                  key={sem.semester}
                  className="p-3 rounded-xl bg-slate-50 border border-indigo-100/80 flex items-center justify-between gap-2"
                >
                  <div>
                    <p className="text-xs font-bold text-[#1b274b]">{sem.semester}</p>
                    <p className="text-[10.5px] text-slate-500">{sem.yearLabel}</p>
                  </div>
                  <input
                    type="text"
                    value={sem.sgpa}
                    onChange={(e) => onUpdateSemesterSgpa(idx, e.target.value)}
                    placeholder="e.g. 8.50"
                    className="w-32 px-2.5 py-1.5 rounded-lg bg-white border border-indigo-200 text-xs font-semibold text-right text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-indigo-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7e60ed] to-[#6366f1] shadow-sm cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
