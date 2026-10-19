import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { NAV_ITEMS } from './Navbar';

interface FooterProps {
  personal: typeof PORTFOLIO_DATA.personal;
  onScrollTop: () => void;
  onNavigate?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ personal, onScrollTop, onNavigate }) => {
  return (
    <footer className="bg-[#171c3a] text-slate-300 border-t border-indigo-900/60">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-indigo-900/60">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-indigo-400/40 shadow-sm shrink-0 bg-slate-800">
                <img
                  src="/assets/salim-photo.png?v=face"
                  alt="Salim Ansari"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="font-serif font-bold tracking-[0.14em] text-white text-base">
                SALIM ANSARI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {personal.title} at {personal.institution}. Building thoughtful software and practical AI/ML solutions.
            </p>
            <p className="font-handwriting text-lg text-sakura-300">
              &ldquo;Small Steps, Big Dreams&rdquo;
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate(item.id);
                    } else {
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Scroll Top */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">
                Connect
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  aria-label="Email Salim Ansari"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={onScrollTop}
              className="mt-6 md:mt-0 self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 hover:bg-indigo-500/35 text-indigo-200 text-xs font-semibold border border-indigo-400/30 transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top Sky</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with React, TypeScript &amp; Tailwind CSS</span>
            <Heart className="w-3.5 h-3.5 text-sakura-400 fill-sakura-400" />
            <span>for SIT Nagpur CSE (AI/ML)</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
