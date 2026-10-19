import React, { useState } from 'react';
import { Camera, ZoomIn, Sparkles } from 'lucide-react';
import { GalleryItem } from '../data/portfolioData';

interface GallerySectionProps {
  gallery: GalleryItem[];
  onInspectImage: (item: { title: string; subtitle: string; image: string }) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  gallery,
  onInspectImage,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = [
    'All',
    'Certificates & Seminars',
    'Portrait & Campus',
    'Live Project Screenshots',
  ];

  const filteredItems =
    activeFilter === 'All'
      ? gallery
      : gallery.filter((g) => g.category === activeFilter);

  return (
    <section
      id="gallery"
      className="relative py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1560px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-skyworld-100 text-[#283c75] text-xs font-bold tracking-wider uppercase border border-skyworld-200 mb-3">
            <Camera className="w-3.5 h-3.5 text-indigo-600" />
            <span>Chapter 07 • Visual Archive</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#1b274b]">
            Photos, Certificates &amp; Live UI Gallery
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Recent campus moments, stage felicitation at SIT Nagpur (ENTHUSIA 5.0), IIIT Nagpur delegation, IIM Nagpur conclave, hackathon war room sprints, and professional certifications.
          </p>
        </div>

        {/* Category Filter Pills (Shown only when items exist) */}
        {gallery.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-[#7e60ed] to-[#6366f1] text-white shadow-md'
                    : 'bg-white/85 text-slate-700 hover:bg-indigo-50 border border-indigo-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Editorial Grid or Empty State */}
      {gallery.length === 0 ? (
        <div className="anime-glass-card rounded-3xl p-12 sm:p-16 text-center border-2 border-dashed border-indigo-200/80 flex flex-col items-center justify-center min-h-[280px]">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4 shadow-inner">
            <Camera className="w-8 h-8 opacity-75" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1b274b] mb-2">
            Gallery Space Khali Hai
          </h3>
          <p className="text-sm text-slate-500 max-w-md leading-relaxed">
            Ye section poori tarah se empty kar diya hai. Yahan aap jo bhi naye photos, UI designs, art ya certificates daalna chahte hain, bataiye hum turant add kar denge! ✨
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <figure
              key={item.id}
              onClick={() =>
                onInspectImage({
                  title: item.title,
                  subtitle: item.caption,
                  image: item.image,
                })
              }
              className="anime-glass-card anime-glass-card-hover rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-indigo-50">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    objectPosition:
                      item.objectPosition ||
                      (item.aspect === 'tall' ? 'center 5%' : 'center center'),
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#152040]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white">
                  <span className="text-xs font-semibold">Click to enlarge</span>
                  <span className="w-8 h-8 rounded-full bg-white/90 text-indigo-800 flex items-center justify-center shadow">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-white/95 backdrop-blur-sm text-[#24325e] shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              <figcaption className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#1b274b] group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-indigo-50 flex items-center justify-between text-[11px] text-indigo-600 font-semibold">
                  <span>View Full Resolution</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
};
