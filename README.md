# Salim Ansari — Personal AI Portfolio Website ⚡💼

A high-performance, modern developer portfolio website crafted for **Salim Ansari** (*Third-Year B.Tech Computer Science Engineering student specializing in Artificial Intelligence & Machine Learning at Symbiosis Institute of Technology, Nagpur*).

---

## ✨ Key Features

1. **Walking AI Engineer Character Runway (`src/components/TopWalkingBanner.tsx`)**
   - High-contrast black & white AI engineer character in sleek executive attire with 4-phase human walk cycle sprite animation.
   - Smoothly traverses the top cybernetic runway, syncs tempo with music playback, and pauses with interactive greetings.

2. **Executive Cyber Bento Dashboard (`src/components/HeroAndBentoSection.tsx`)**
   - Sleek cybernetic dark executive theme, vector typography, **Explore My Work** & **Let's Connect** CTAs, 3-column bento overview (**About Me**, **Education**, **Technical Skills**), and **Featured Projects** strip.

3. **Full Portfolio Sections**
   - **About Me & Career Interests (`#about`)**: Interactive Developer Journal with tabs for *My Story*, *Learning Goals*, and *Career & Internship Interests*, plus a decorative Study Club note.
   - **Education & Academic Performance (`#education`)**: Symbiosis Institute of Technology, Nagpur details, core coursework, and semester-wise SGPA progression cards (editable live via the **Customize** modal or in `src/data/portfolioData.ts`).
   - **Technical Skills (`#skills`)**: Categorized across *Programming Languages*, *Frontend Development*, *Backend and APIs*, *AI/ML and Data Science*, *Databases*, *Developer Tools*, and *Other Technical Skills* with honest **Proficient** vs **Exploring** badges.
   - **Projects Showcase & Case Study Modals (`#projects`)**: Detailed cards and interactive modals for **LiteratureAI**, **Medilink**, **Campus Complaints**, and **NOIRÉ**.
   - **Achievements, Participation & Certificates (`#achievements` & `#certificates`)**: Filterable certificate gallery with click-to-enlarge Lightbox viewer.
   - **Photos & Visual Gallery (`#gallery`)**: Filterable editorial grid with full-resolution Lightbox viewer.
   - **Sunset Contact Section (`#contact`)**: Validated contact form with direct `mailto:` launch and 1-click formatted message copy.
   - **Optional Ambient Sky Chimes (`src/utils/ambientSound.ts`)**: Native Web Audio API Japanese pentatonic music-box synthesizer, **OFF by default** with zero autoplay.

---

## 🚀 How to Run Locally

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open the local URL displayed in your terminal (typically `http://localhost:5173`).

3. **Build for production**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🛠️ How to Update Your Personal Details, SGPA, & Certificates

All portfolio content is centralized in **[`src/data/portfolioData.ts`](./src/data/portfolioData.ts)**:
- **Email, GitHub, & LinkedIn URLs**: Update `PORTFOLIO_DATA.personal` (or click the **Customize** button in the top navigation bar to test updates directly in the browser).
- **Semester SGPAs**: Update `PORTFOLIO_DATA.education.semesters` or use the in-app **Customize** modal.
- **Certificates & Campus Photos**: Drop your certificate images/PDFs or campus photos into `public/assets/` and update `PORTFOLIO_DATA.certificates` and `PORTFOLIO_DATA.gallery`.
