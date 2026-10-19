import React, { useState } from 'react';
import {
  Trophy,
  Award,
  ZoomIn,
  Calendar,
  Building2,
  Users,
  Sparkles,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';
import {
  CertificateItem,
  ParticipationItem,
} from '../data/portfolioData';

interface AchievementsAndCertificatesSectionProps {
  participation: ParticipationItem[];
  certificates: CertificateItem[];
  onInspectImage: (item: { title: string; subtitle: string; image: string }) => void;
  onOpenQuickCustomize: () => void;
}

export const AchievementsAndCertificatesSection: React.FC<
  AchievementsAndCertificatesSectionProps
> = ({ participation, certificates, onInspectImage }) => {
  const [certCategory, setCertCategory] = useState<string>('All');

  const categories = [
    'All',
    'Industry Internship',
    'AI/ML & Cloud Certifications',
    'Programming & Web Certifications',
  ];

  const filteredCerts =
    certCategory === 'All'
      ? certificates
      : certificates.filter((c) => c.category === certCategory);

  return (
    <div className="space-y-8">
      {/* =====================================================================
          SECTION 10 & 8A: ACHIEVEMENTS, INTERNSHIP & PARTICIPATION (#achievements)
      ===================================================================== */}
      <section
        id="achievements"
        className="relative py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1560px] mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold tracking-wider uppercase border border-amber-200 mb-3">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Chapter 05 • Experience &amp; Achievements</span>
            </div>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#1b274b]">
              Industry Internship, Research &amp; Milestones
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Verified industry internship at Maincrafts Technology, Springer research publication, Hack-o-Week 5th-semester ML/Full-Stack engineering suite, and open-source lab repositories.
            </p>
          </div>

        </div>

        {/* Participation & Contributions Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {participation.map((item) => {
            const isVerified = item.status === 'Verified Milestone';
            return (
              <div
                key={item.id}
                className="anime-glass-card anime-glass-card-hover rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200/80">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      {item.category}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        isVerified
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#1b274b]">
                    {item.title}
                  </h3>

                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                      {item.organization}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-100/70 flex items-center justify-between text-xs">
                  {item.linkUrl ? (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      <span>View Verification / Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-slate-500">Symbiosis Institute of Technology, Nagpur</span>
                  )}
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION 8B: CERTIFICATES GALLERY WITH LIGHTBOX (#certificates)
      ===================================================================== */}
      <section
        id="certificates"
        className="relative py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1560px] mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender-100 text-indigo-900 text-xs font-bold tracking-wider uppercase border border-lavender-200 mb-3">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span>Chapter 06 • Verified Credentials</span>
            </div>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#1b274b]">
              Certificates &amp; Seminar Credentials
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Click any certificate card to inspect it in the full-screen Lightbox Viewer or download the official PDF document.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCertCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  certCategory === cat
                    ? 'bg-gradient-to-r from-[#7e60ed] to-[#6366f1] text-white shadow-md'
                    : 'bg-white/85 text-slate-700 hover:bg-indigo-50 border border-indigo-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Display: Featured Industry Internship Milestone + 4-Column Balanced Grid */}
        <div className="min-h-[580px] space-y-6">
          {/* Featured Industry Internship Credential (Shown on 'All' or 'Industry Internship') */}
          {(certCategory === 'All' || certCategory === 'Industry Internship') && (
            <div className="anime-glass-card rounded-3xl p-6 sm:p-7 border border-indigo-100 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Certificate Preview Frame (5 cols) */}
                <div
                  onClick={() =>
                    onInspectImage({
                      title: certificates[0].title,
                      subtitle: `${certificates[0].issuer} • ${certificates[0].dateLabel}`,
                      image: certificates[0].previewImage,
                    })
                  }
                  className="lg:col-span-5 relative aspect-[16/10] bg-gradient-to-br from-indigo-100 via-skyworld-50 to-sakura-100 rounded-2xl overflow-hidden cursor-pointer p-2.5 border border-indigo-100 group shadow-sm"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
                    <img
                      src={certificates[0].previewImage}
                      alt={certificates[0].title}
                      loading="lazy"
                      className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#192549]/80 via-transparent to-transparent flex items-end justify-between p-3 text-white pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950/85 text-white">
                        {certificates[0].credentialId}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-white/95 text-indigo-700 flex items-center justify-center shadow">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Certificate Details & Actions (7 cols) */}
                <div className="lg:col-span-7 space-y-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      ★ Featured Industry Credential
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      MSME Verified
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-extrabold text-xl sm:text-2xl text-[#1b274b]">
                      {certificates[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                      {certificates[0].issuer} • {certificates[0].dateLabel}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {certificates[0].description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'LocalStorage'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        onInspectImage({
                          title: certificates[0].title,
                          subtitle: `${certificates[0].issuer} • ${certificates[0].dateLabel}`,
                          image: certificates[0].previewImage,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200 shadow-sm transition-all cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Enlarge Certificate</span>
                    </button>

                    {certificates[0].documentUrl && (
                      <a
                        href={certificates[0].documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#7e60ed] to-[#6366f1] hover:from-[#6d4de4] hover:to-[#5254e6] text-white text-xs font-bold shadow-sm transition-all"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>View / Download Official PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Course Certifications Grid: 4-Column on 'All', 2-Column on Filtered Views */}
          {certCategory !== 'Industry Internship' && (
            <div
              className={`grid gap-5 ${
                certCategory === 'All'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2'
              }`}
            >
              {(certCategory === 'All'
                ? certificates.slice(1)
                : filteredCerts.filter((c) => c.category !== 'Industry Internship')
              ).map((cert) => (
                <div
                  key={cert.id}
                  className="anime-glass-card anime-glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Certificate Preview Frame */}
                    <div
                      onClick={() =>
                        onInspectImage({
                          title: cert.title,
                          subtitle: `${cert.issuer} • ${cert.dateLabel}`,
                          image: cert.previewImage,
                        })
                      }
                      className="relative aspect-[16/10] bg-gradient-to-br from-indigo-100 via-skyworld-50 to-sakura-100 overflow-hidden cursor-pointer p-2.5"
                    >
                      <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/80 shadow-inner bg-white">
                        <img
                          src={cert.previewImage}
                          alt={cert.title}
                          loading="lazy"
                          className="w-full h-full object-contain bg-white p-1 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#192549]/80 via-transparent to-transparent flex items-end justify-between p-2.5 text-white pointer-events-none">
                          <span className="text-[10px] uppercase font-bold text-amber-200 drop-shadow truncate max-w-[120px]">
                            {cert.credentialId}
                          </span>
                          <span className="w-6 h-6 rounded-full bg-white/95 text-indigo-700 flex items-center justify-center shadow">
                            <ZoomIn className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-4 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span className="truncate">{cert.issuer.split('(')[0].trim()}</span>
                        <span className="text-indigo-600 font-semibold shrink-0">Verified</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#1b274b] leading-snug line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-2.5 border-t border-indigo-100/70 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() =>
                        onInspectImage({
                          title: cert.title,
                          subtitle: `${cert.issuer} • ${cert.dateLabel}`,
                          image: cert.previewImage,
                        })
                      }
                      className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer text-[11px]"
                    >
                      <ZoomIn className="w-3 h-3" />
                      <span>Enlarge</span>
                    </button>

                    {cert.documentUrl ? (
                      <a
                        href={cert.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline"
                      >
                        <FileCheck2 className="w-3 h-3 text-emerald-600" />
                        <span>PDF</span>
                      </a>
                    ) : (
                      <span className="text-[11px] font-medium text-emerald-700">Verified</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
