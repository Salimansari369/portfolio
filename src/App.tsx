import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import {
  PORTFOLIO_DATA,
  ProjectItem,
  SemesterRecord,
} from './data/portfolioData';
import { Navbar, NAV_ITEMS } from './components/Navbar';
import { TopWalkingBanner } from './components/TopWalkingBanner';
import { HeroAndBentoSection } from './components/HeroAndBentoSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsAndCertificatesSection } from './components/AchievementsAndCertificatesSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ImageLightbox } from './components/ImageLightbox';
import { QuickCustomizeModal } from './components/QuickCustomizeModal';
import { AUDIO_TRACKS } from './data/audioTracks';

const STORAGE_KEY_PERSONAL = 'salim_portfolio_personal_v2';
const STORAGE_KEY_SEMESTERS = 'salim_portfolio_semesters_v2';

export function App() {
  // Personal & Semester State (supports live browser customization + localStorage persistence)
  const [personal, setPersonal] = useState<typeof PORTFOLIO_DATA.personal>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PERSONAL);
      return saved ? { ...PORTFOLIO_DATA.personal, ...JSON.parse(saved) } : PORTFOLIO_DATA.personal;
    } catch {
      return PORTFOLIO_DATA.personal;
    }
  });

  const [semesters, setSemesters] = useState<SemesterRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SEMESTERS);
      return saved ? JSON.parse(saved) : PORTFOLIO_DATA.education.semesters;
    } catch {
      return PORTFOLIO_DATA.education.semesters;
    }
  });

  // Keep animations active by default so the signature walking character always walks smoothly;
  // users can toggle reducedMotion anytime via the Navbar button.
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // 3D Orientation Reset Signal (triggered from Dev menu in Navbar or reset button)
  const [reset3DSignal, setReset3DSignal] = useState<number>(0);

  // Navigation ScrollSpy & Progress State
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [showFloatingNav, setShowFloatingNav] = useState<boolean>(false);

  // Modals & Lightbox State
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [lightboxItem, setLightboxItem] = useState<{
    title: string;
    subtitle: string;
    image: string;
  } | null>(null);
  const [customizeOpen, setCustomizeOpen] = useState<boolean>(false);

  // Background Audio Player (3 chill tracks with loop, pause, and track switching)
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(pct);
      setShowBackToTop(scrollTop > 520);
      setShowFloatingNav(scrollTop > 90);

      // Determine active section
      const viewportOffset = scrollTop + 220;
      let current = 'home';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= viewportOffset) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const getOrCreateAudio = (trackIdx: number): HTMLAudioElement => {
    if (!audioRef.current) {
      const audio = new Audio(AUDIO_TRACKS[trackIdx].src);
      audio.loop = true;
      audio.volume = 0.65;
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const handleTogglePlayMusic = () => {
    const audio = getOrCreateAudio(currentTrackIndex);
    if (isPlayingMusic) {
      audio.pause();
      setIsPlayingMusic(false);
    } else {
      audio.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  const handleSelectTrack = (index: number) => {
    if (index < 0 || index >= AUDIO_TRACKS.length) return;
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = AUDIO_TRACKS[index].src;
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.warn('Audio play error:', err);
      });
    } else {
      const audio = new Audio(AUDIO_TRACKS[index].src);
      audio.loop = true;
      audio.volume = 0.65;
      audioRef.current = audio;
      audio.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.warn('Audio play error:', err);
      });
    }
  };

  const handleUpdatePersonal = (updated: Partial<typeof PORTFOLIO_DATA.personal>) => {
    setPersonal((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem(STORAGE_KEY_PERSONAL, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  };

  const handleUpdateSemesterSgpa = (index: number, newSgpa: string) => {
    setSemesters((prev) => {
      const next = prev.map((item, idx) => {
        if (idx !== index) return item;
        const trimmed = newSgpa.trim();
        const isNumericRecord = /^\d+(\.\d+)?$/.test(trimmed);
        return {
          ...item,
          sgpa: newSgpa,
          isPlaceholder: !isNumericRecord,
        };
      });
      try {
        localStorage.setItem(STORAGE_KEY_SEMESTERS, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  };

  const handleResetDefaults = () => {
    setPersonal(PORTFOLIO_DATA.personal);
    setSemesters(PORTFOLIO_DATA.education.semesters);
    try {
      localStorage.removeItem(STORAGE_KEY_PERSONAL);
      localStorage.removeItem(STORAGE_KEY_SEMESTERS);
    } catch {
      // Ignore
    }
  };

  // Navigation: Direct smooth scrolling to target sections
  const handleNavigate = useCallback(
    (targetId: string) => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    },
    [reducedMotion]
  );

  // Global internal link interceptor: captures all <a href="#section"> clicks across the entire site
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();
      handleNavigate(targetId);
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [handleNavigate]);

  const scrollToTop = () => {
    handleNavigate('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020813] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-clip">
      {/* =================================================================
          PAGE BACKGROUND ANIMATED CYBER ELEMENTS (Behind All Content, z-0)
      ================================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Ambient Glowing Cyber Nebulae */}
        <div className="absolute top-[-10%] left-[15%] w-[650px] h-[650px] rounded-full bg-cyan-500/[0.08] blur-[140px] animate-cyber-pulse" />
        <div className="absolute top-[35%] right-[5%] w-[750px] h-[750px] rounded-full bg-blue-600/[0.06] blur-[160px] animate-cyber-float-1" />
        <div className="absolute top-[65%] left-[5%] w-[600px] h-[600px] rounded-full bg-indigo-500/[0.05] blur-[150px] animate-cyber-float-2" />

        {/* Ambient Subtle Cyber Grid Matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.035]" />
      </div>

      {/* Floating Cyber Glass Navbar (Appears on Scroll) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 pointer-events-none ${
          showFloatingNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <Navbar
          activeSection={activeSection}
          scrollProgress={scrollProgress}
          isPlayingMusic={isPlayingMusic}
          currentTrackIndex={currentTrackIndex}
          tracks={AUDIO_TRACKS}
          onToggleMusic={handleTogglePlayMusic}
          onSelectTrack={handleSelectTrack}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
          onOpenQuickCustomize={() => setCustomizeOpen(true)}
          onReset3D={() => setReset3DSignal((prev) => prev + 1)}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Walking & Dancing Mascot Banner (Theme-Matched Cyber Runway) */}
        <TopWalkingBanner
          activeSection={activeSection}
          reducedMotion={reducedMotion}
          currentTrack={AUDIO_TRACKS[currentTrackIndex]}
          isPlayingMusic={isPlayingMusic}
        />

        {/* Hero Section + 3-Column Bento Overview + Music Mascot Triptych */}
        <HeroAndBentoSection
          personal={personal}
          projects={PORTFOLIO_DATA.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
          reducedMotion={reducedMotion}
          reset3DSignal={reset3DSignal}
          tracks={AUDIO_TRACKS}
          currentTrackIndex={currentTrackIndex}
          isPlayingMusic={isPlayingMusic}
          onSelectTrack={handleSelectTrack}
          onToggleMusic={handleTogglePlayMusic}
          onNavigate={handleNavigate}
        />

        {/* Subtle Cloud Divider */}
        <div className="max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
        </div>

        {/* Section 4 & 9: About Me & Career Interests Journal */}
        <AboutSection
          personal={personal}
          aboutJournal={PORTFOLIO_DATA.aboutJournal}
        />

        {/* Section 5: Education & Academic Performance Timeline */}
        <EducationSection
          education={PORTFOLIO_DATA.education}
          semesters={semesters}
          onOpenQuickCustomize={() => setCustomizeOpen(true)}
        />

        {/* Section 6: Interactive Categorized Technical Skills */}
        <SkillsSection skills={PORTFOLIO_DATA.skills} />

        {/* Section 7: Full Projects Showcase & Case Studies */}
        <ProjectsSection
          projects={PORTFOLIO_DATA.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Section 8 & 10: Achievements, Participation & Certificates with Lightbox */}
        <AchievementsAndCertificatesSection
          participation={PORTFOLIO_DATA.participation}
          certificates={PORTFOLIO_DATA.certificates}
          onInspectImage={(item) => setLightboxItem(item)}
          onOpenQuickCustomize={() => setCustomizeOpen(true)}
        />

        {/* Section 11: Academic & Project Visual Gallery */}
        <GallerySection
          gallery={PORTFOLIO_DATA.gallery}
          onInspectImage={(item) => setLightboxItem(item)}
        />

        {/* Section 12: Dreamy Anime Sunset Contact Section */}
        <ContactSection personal={personal} />
      </main>

      {/* Footer */}
      <Footer personal={personal} onScrollTop={scrollToTop} onNavigate={handleNavigate} />

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-r from-[#8762ee] to-[#6364ec] text-white shadow-pill hover:scale-105 flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuickCustomize={() => setCustomizeOpen(true)}
      />

      {/* Full-Resolution Image & Certificate Lightbox */}
      <ImageLightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />

      {/* Quick Customize & SGPA Editor Modal */}
      <QuickCustomizeModal
        isOpen={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        personal={personal}
        semesters={semesters}
        onUpdatePersonal={handleUpdatePersonal}
        onUpdateSemesterSgpa={handleUpdateSemesterSgpa}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}

export default App;
