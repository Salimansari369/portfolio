import React, { useRef, useState } from 'react';
import {
  GraduationCap,
  MapPin,
  BookMarked,
  Award,
  SlidersHorizontal,
  Sparkles,
  CheckCircle,
  School,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ExternalLink,
  Camera,
} from 'lucide-react';
import { PORTFOLIO_DATA, SemesterRecord } from '../data/portfolioData';

interface EducationSectionProps {
  education: typeof PORTFOLIO_DATA.education;
  semesters: SemesterRecord[];
  onOpenQuickCustomize: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  semesters,
  onOpenQuickCustomize,
}) => {
  const [viewMode, setViewMode] = useState<'photo' | 'video'>('photo');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="education"
      className="relative py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1560px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-skyworld-100 text-[#283c75] text-xs font-bold tracking-wider uppercase border border-skyworld-200 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Chapter 02 • Academic Journey</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#1b274b]">
            Education &amp; Academic Performance
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpenQuickCustomize}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-200 shadow-sm transition-all cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Update Semester SGPA</span>
        </button>
      </div>

      {/* Main University Feature Card */}
      <div className="anime-glass-card rounded-3xl p-6 sm:p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: University Info & Coursework (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                {education.currentStatus}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sakura-100 text-rose-800 border border-sakura-200">
                AI &amp; ML Specialization
              </span>
            </div>

            <div>
              <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#1b274b]">
                {education.institution}
              </h3>
              <p className="text-sm font-semibold text-indigo-600 mt-1">{education.university}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/85 border border-indigo-100/90 space-y-1.5">
              <p className="text-sm sm:text-base font-bold text-[#1f2c54]">{education.degree}</p>
              <p className="text-xs sm:text-sm font-semibold text-purple-700">
                {education.specialization}
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>{education.location}</span>
              </div>
            </div>

            {/* Key Coursework Pills */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                <BookMarked className="w-3.5 h-3.5 text-indigo-500" />
                <span>Verified Coursework &amp; Engineering Labs</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {education.coreCoursework.map((course) => (
                  <span
                    key={course}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 text-xs font-semibold text-[#283663] border border-indigo-100 shadow-sm"
                  >
                    <CheckCircle className="w-3 h-3 text-indigo-500" />
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Official SIT Nagpur Campus Showcase (Iconic Dome Photo & Video Tour) (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-xl aspect-[16/10] sm:aspect-[4/3] bg-[#0f172a] group">
              {viewMode === 'photo' ? (
                <>
                  <img
                    src="/assets/anime/sit-campus-anime.jpg"
                    alt="Symbiosis Institute of Technology Nagpur Iconic Campus Dome"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top Controls Bar: Official Campus Tag + Video Tour Button */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                    <a
                      href={education.officialWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16203d]/85 hover:bg-[#16203d] text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 transition-all shadow-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>SIT Nagpur Campus</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('video');
                        setTimeout(() => {
                          videoRef.current?.play().catch(() => {});
                          setIsPlaying(true);
                        }, 50);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                    >
                      <Play className="w-3 h-3" />
                      <span>Video Tour</span>
                    </button>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#16203d]/90 via-[#16203d]/40 to-transparent px-4 py-3 text-white pointer-events-none">
                    <p className="font-serif font-bold text-base">
                      Symbiosis Institute of Technology, Nagpur (SIT-N)
                    </p>
                    <p className="text-[11px] text-slate-300 font-medium">
                      Iconic Campus Dome &amp; Lush Gardens • NAAC A++
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    preload="auto"
                    poster="/assets/anime/sit-campus-anime.jpg"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={education.campusVideoUrl} type="video/mp4" />
                    <source src={education.campusRemoteVideoUrl} type="video/mp4" />
                  </video>

                  {/* Top Controls Bar: View Photo Switch + Play/Mute Controls */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                    <button
                      type="button"
                      onClick={() => {
                        videoRef.current?.pause();
                        setIsPlaying(false);
                        setViewMode('photo');
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16203d]/85 hover:bg-[#16203d] text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                    >
                      <Camera className="w-3 h-3" />
                      <span>View Photo</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={togglePlay}
                        title={isPlaying ? 'Pause campus video' : 'Play campus video'}
                        aria-label={isPlaying ? 'Pause campus video' : 'Play campus video'}
                        className="p-1.5 rounded-full bg-[#16203d]/80 hover:bg-[#16203d] text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        title={isMuted ? 'Unmute campus audio' : 'Mute campus audio'}
                        aria-label={isMuted ? 'Unmute campus audio' : 'Mute campus audio'}
                        className="p-1.5 rounded-full bg-[#16203d]/80 hover:bg-[#16203d] text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#16203d]/85 via-[#16203d]/35 to-transparent px-4 py-3 text-white pointer-events-none">
                    <p className="font-serif font-bold text-base">
                      Symbiosis Institute of Technology, Nagpur (SIT-N)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Academic Timeline (University, Jr. College, High School from Wix Resume) */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 px-1">
          <School className="w-4 h-4 text-indigo-600" />
          <h3 className="font-serif font-bold text-xl text-[#1b274b]">
            Academic Qualification Timeline (2020 – 2028)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {education.priorEducation.map((edu, index) => (
            <div
              key={edu.institution}
              className="anime-glass-card anime-glass-card-hover rounded-2xl p-5 flex flex-col justify-between h-full"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {edu.period}
                  </span>
                  <span className="text-xs font-serif font-bold text-slate-400">
                    0{index + 1}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-lg text-[#1b274b] leading-snug">
                  {edu.institution}
                </h4>
                <p className="mt-1 text-xs font-semibold text-indigo-600">
                  {edu.qualification}
                </p>
                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                  {edu.highlights}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-indigo-50 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>{edu.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Semester-Wise Academic Progression Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 px-1">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" />
            <h3 className="font-serif font-bold text-xl text-[#1b274b]">
              B.Tech CSE (AI/ML) Semester Progression &amp; SGPA
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Click{' '}
            <button
              type="button"
              onClick={onOpenQuickCustomize}
              className="text-indigo-600 font-semibold underline hover:text-indigo-800 cursor-pointer"
            >
              Update Semester SGPA
            </button>{' '}
            to enter exact semester SGPA scores anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {semesters.map((sem, idx) => (
            <div
              key={sem.semester}
              className="anime-glass-card anime-glass-card-hover rounded-2xl p-5 flex flex-col justify-between h-full relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
                    {sem.yearLabel}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#1b274b]">{sem.semester}</h4>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border ${
                    sem.isPlaceholder
                      ? 'bg-indigo-50/90 text-indigo-700 border-indigo-200/80'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {sem.isPlaceholder ? sem.sgpa : `SGPA: ${sem.sgpa}`}
                </span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-indigo-100/70">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Key Focus &amp; Lab Repositories:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {sem.focusSubjects.map((sub) => (
                    <span
                      key={sub}
                      className="px-2 py-0.5 rounded-md bg-white/90 text-[11px] font-medium text-slate-700 border border-indigo-100"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Semester 0{idx + 1}</span>
                <Sparkles className="w-3 h-3 text-lavender-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
