import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface ImageLightboxProps {
  item: { title: string; subtitle: string; image: string } | null;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-white shadow-2xl border border-white/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-slate-900 max-h-[72vh] flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[72vh] w-auto object-contain"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1b274b]">
              {item.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">{item.subtitle}</p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={item.image}
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-semibold text-xs border border-indigo-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Image</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
